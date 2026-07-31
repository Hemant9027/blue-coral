import { NextResponse } from 'next/server';
import { createBooking } from '@/lib/bookings-store';
import { addQuery, deleteQuery, getQueries } from '@/lib/query-store';

const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getEarliestDepartureDate = (arrivalDate: string) => {
  if (!arrivalDate) {
    return undefined;
  }

  const arrival = new Date(`${arrivalDate}T00:00:00`);
  const minimumStayEnd = new Date(arrival);
  minimumStayEnd.setDate(arrival.getDate() + 3);

  const isJuly30Arrival =
    arrival.getFullYear() === 2026 && arrival.getMonth() === 6 && arrival.getDate() === 30;

  if (isJuly30Arrival) {
    const augustFirst = new Date(arrival.getFullYear(), arrival.getMonth() + 1, 1);
    return formatDateForInput(augustFirst > minimumStayEnd ? augustFirst : minimumStayEnd);
  }

  return formatDateForInput(minimumStayEnd);
};

export async function GET() {
  const queries = await getQueries();
  return NextResponse.json(queries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const requiredFields = ['name', 'email', 'arrivalDate', 'departureDate', 'guests', 'message'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
    }
  }

  const arrivalDate = String(body.arrivalDate);
  const departureDate = String(body.departureDate);
  const arrival = new Date(`${arrivalDate}T00:00:00`);
  const departure = new Date(`${departureDate}T00:00:00`);
  const earliestDeparture = getEarliestDepartureDate(arrivalDate);
  const earliestDepartureDate = earliestDeparture
    ? new Date(`${earliestDeparture}T00:00:00`)
    : null;

  if (departure < arrival) {
    return NextResponse.json(
      { error: 'Departure date cannot be earlier than the arrival date.' },
      { status: 400 }
    );
  }

  if (earliestDepartureDate && departure < earliestDepartureDate) {
    return NextResponse.json(
      { error: 'Minimum stay is 3 nights. Please choose a later departure date.' },
      { status: 400 }
    );
  }

  try {
    const booking = await createBooking({
      name: String(body.name),
      email: String(body.email),
      phone: String(body.phone || ''),
      checkIn: arrivalDate,
      checkOut: departureDate,
      guests: Number(body.guests) || 1,
      specialRequests: String(body.message || ''),
      status: 'pending',
    });

    await addQuery({
      name: String(body.name),
      email: String(body.email),
      phone: String(body.phone || ''),
      arrivalDate,
      departureDate,
      guests: String(body.guests),
      message: String(body.message),
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to submit your inquiry.';
    const normalizedMessage =
      message.includes('overlap') || message.includes('available')
        ? 'The selected dates are no longer available. Please choose different dates.'
        : message;
    return NextResponse.json({ error: normalizedMessage }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const id = String(body.id || '');
  if (!id) {
    return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  }

  const deleted = await deleteQuery(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Query not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
