import { NextResponse } from 'next/server';
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  type BookingRecord,
} from '@/lib/bookings-store';

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await createBooking({
      name: String(body.name || ''),
      email: String(body.email || ''),
      phone: String(body.phone || ''),
      checkIn: String(body.checkIn || ''),
      checkOut: String(body.checkOut || ''),
      guests: Number(body.guests || 1),
      specialRequests: String(body.specialRequests || ''),
      status: String(body.status || 'pending') as BookingRecord['status'],
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create booking.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id || '');
    if (!id) {
      return NextResponse.json({ error: 'id is required.' }, { status: 400 });
    }

    const booking = await updateBooking(id, {
      name: body.name,
      email: body.email,
      phone: body.phone,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: body.guests,
      specialRequests: body.specialRequests,
      status: body.status,
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update booking.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id || '');
    if (!id) {
      return NextResponse.json({ error: 'id is required.' }, { status: 400 });
    }

    const deleted = await deleteBooking(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to delete booking.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
