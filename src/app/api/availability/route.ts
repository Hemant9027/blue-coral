import { NextResponse } from 'next/server';
import { getAvailabilityBookingsForMonth } from '@/lib/availability-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = Number(searchParams.get('year'));
  const month = Number(searchParams.get('month'));

  if (!Number.isInteger(year) || !Number.isInteger(month)) {
    return NextResponse.json({ error: 'year and month are required.' }, { status: 400 });
  }

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const bookings = await getAvailabilityBookingsForMonth(
    startDate.toISOString(),
    endDate.toISOString()
  );

  return NextResponse.json({ bookings });
}
