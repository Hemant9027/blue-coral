import { NextResponse } from 'next/server';
import { deleteQuery, getQueries } from '@/lib/query-store';

export async function GET() {
  const queries = await getQueries();
  return NextResponse.json(queries);
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
