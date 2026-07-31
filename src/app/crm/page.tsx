'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Trash2, Plus, Search } from 'lucide-react';
import type { BookingRecord, BookingStatus } from '@/lib/bookings-store';

const statusClasses: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800',
  cancelled: 'bg-slate-100 text-slate-700',
};

const createEmptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  specialRequests: '',
  status: 'pending' as BookingStatus,
});

export default function CrmDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [sortKey, setSortKey] = useState<'createdAt' | 'checkIn' | 'checkOut'>('createdAt');
  const [form, setForm] = useState(createEmptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    type: 'delete' | 'reject';
  } | null>(null);

  const loadBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) {
        throw new Error('Unable to load bookings.');
      }
      const payload = await response.json();
      setBookings(Array.isArray(payload) ? payload : []);
    } catch {
      setNotification({ type: 'error', message: 'Unable to load bookings right now.' });
    }
  };

  useEffect(() => {
    void loadBookings();
  }, []);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = window.setTimeout(() => setNotification(null), 3200);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...bookings]
      .filter((booking) => {
        if (statusFilter !== 'all' && booking.status !== statusFilter) {
          return false;
        }

        if (!query) {
          return true;
        }

        return [booking.name, booking.email, booking.phone, booking.checkIn, booking.checkOut]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sortKey === 'checkIn') {
          return a.checkIn.localeCompare(b.checkIn);
        }
        if (sortKey === 'checkOut') {
          return a.checkOut.localeCompare(b.checkOut);
        }
        return a.createdAt.localeCompare(b.createdAt);
      });
  }, [bookings, search, statusFilter, sortKey]);

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        ...form,
        guests: Number(form.guests),
      };

      const response = editingId
        ? await fetch('/api/bookings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...payload }),
          })
        : await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || 'Unable to save booking.');
      }

      setNotification({
        type: 'success',
        message: editingId ? 'Booking updated successfully.' : 'Booking created successfully.',
      });
      resetForm();
      await loadBookings();
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to save booking.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (id: string, nextStatus: BookingStatus) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || 'Unable to update booking status.');
      }
      setNotification({
        type: 'success',
        message: `Booking ${nextStatus === 'approved' ? 'approved' : nextStatus === 'rejected' ? 'rejected' : 'updated'}.`,
      });
      await loadBookings();
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to update booking status.',
      });
    }
  };

  const confirmDelete = async () => {
    if (!confirmAction) {
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: confirmAction.id }),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || 'Unable to delete booking.');
      }
      setNotification({
        type: 'success',
        message: 'Booking deleted successfully.',
      });
      setConfirmAction(null);
      await loadBookings();
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to delete booking.',
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {notification ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border px-4 py-3 text-sm ${notification.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}
          >
            {notification.message}
          </motion.div>
        ) : null}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-caps text-primary mb-3">Booking Management</p>
            <h1 className="section-headline text-foreground">
              Manage reservations and availability
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Create, review, approve, reject, and archive booking requests while keeping the live
              availability calendar synchronized.
            </p>
          </div>
          <Link href="/" className="luxury-btn-outline self-start">
            View Frontend
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[380px_minmax(0,1fr)]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_25px_80px_rgba(27,79,107,0.08)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="label-caps text-primary">Booking Form</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  {editingId ? 'Edit booking' : 'Create booking'}
                </h2>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-border px-3 py-2 text-sm text-muted-foreground"
              >
                Reset
              </button>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm text-muted-foreground">
                Guest Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="rounded-2xl border border-border px-4 py-3 text-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted-foreground">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="rounded-2xl border border-border px-4 py-3 text-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted-foreground">
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="rounded-2xl border border-border px-4 py-3 text-foreground"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-muted-foreground">
                  Check-in
                  <input
                    required
                    type="date"
                    value={form.checkIn}
                    onChange={(event) => setForm({ ...form, checkIn: event.target.value })}
                    className="rounded-2xl border border-border px-4 py-3 text-foreground"
                  />
                </label>
                <label className="grid gap-2 text-sm text-muted-foreground">
                  Check-out
                  <input
                    required
                    type="date"
                    value={form.checkOut}
                    onChange={(event) => setForm({ ...form, checkOut: event.target.value })}
                    className="rounded-2xl border border-border px-4 py-3 text-foreground"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-muted-foreground">
                Guests
                <input
                  required
                  type="number"
                  min="1"
                  value={form.guests}
                  onChange={(event) => setForm({ ...form, guests: event.target.value })}
                  className="rounded-2xl border border-border px-4 py-3 text-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted-foreground">
                Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value as BookingStatus })
                  }
                  className="rounded-2xl border border-border px-4 py-3 text-foreground"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm text-muted-foreground">
                Special Requests
                <textarea
                  rows={3}
                  value={form.specialRequests}
                  onChange={(event) => setForm({ ...form, specialRequests: event.target.value })}
                  className="rounded-2xl border border-border px-4 py-3 text-foreground"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-70"
            >
              <Plus size={16} />
              {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Booking'}
            </button>
          </form>

          <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_25px_80px_rgba(27,79,107,0.08)]">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="label-caps text-primary">Bookings</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  Booking requests and reservations
                </h2>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <label className="flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  <Search size={16} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search bookings"
                    className="w-full bg-transparent outline-none"
                  />
                </label>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as 'all' | BookingStatus)}
                  className="rounded-2xl border border-border bg-muted/40 px-3 py-2 text-sm text-foreground"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={sortKey}
                  onChange={(event) =>
                    setSortKey(event.target.value as 'createdAt' | 'checkIn' | 'checkOut')
                  }
                  className="rounded-2xl border border-border bg-muted/40 px-3 py-2 text-sm text-foreground"
                >
                  <option value="createdAt">Sort: Created</option>
                  <option value="checkIn">Sort: Check-in</option>
                  <option value="checkOut">Sort: Check-out</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-muted/70 text-left text-sm uppercase tracking-[0.15em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Guest</th>
                    <th className="px-4 py-3">Dates</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-12 text-center text-sm text-muted-foreground"
                      >
                        No bookings match your current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-border">
                        <td className="px-4 py-4 align-top">
                          <div className="font-medium text-foreground">{booking.name}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{booking.email}</div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {booking.phone || 'No phone provided'}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                          <div>
                            {booking.checkIn} → {booking.checkOut}
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {booking.specialRequests || 'No special requests'}
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClasses[booking.status]}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                setForm({
                                  ...booking,
                                  guests: String(booking.guests),
                                  status: booking.status,
                                });
                                setEditingId(booking.id);
                              }}
                              className="rounded-full border border-border px-3 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary"
                            >
                              Edit
                            </button>
                            {booking.status !== 'approved' ? (
                              <button
                                onClick={() => void handleStatusChange(booking.id, 'approved')}
                                className="rounded-full bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700"
                              >
                                Approve
                              </button>
                            ) : null}
                            {booking.status !== 'rejected' ? (
                              <button
                                onClick={() => {
                                  setConfirmAction({ id: booking.id, type: 'reject' });
                                }}
                                className="rounded-full bg-rose-600 px-3 py-2 text-sm text-white transition hover:bg-rose-700"
                              >
                                Reject
                              </button>
                            ) : null}
                            <button
                              onClick={() => setConfirmAction({ id: booking.id, type: 'delete' })}
                              className="rounded-full border border-rose-200 px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {confirmAction ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-border bg-white p-6 shadow-2xl">
            <p className="label-caps text-primary">Confirm action</p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              {confirmAction.type === 'delete' ? 'Delete booking?' : 'Reject booking?'}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {confirmAction.type === 'delete'
                ? 'This will permanently remove the booking from the system.'
                : 'This will mark the request as rejected and it will no longer block dates.'}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmAction.type === 'delete') {
                    void confirmDelete();
                  } else {
                    void handleStatusChange(confirmAction.id, 'rejected');
                    setConfirmAction(null);
                  }
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${confirmAction.type === 'delete' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-600 hover:bg-amber-700'}`}
              >
                {confirmAction.type === 'delete' ? 'Delete' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
