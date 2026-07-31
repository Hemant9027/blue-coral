'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export default function CrmLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const response = await fetch('/api/crm-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    setSubmitting(false);

    if (!response.ok) {
      const body = await response.json();
      setError(body.error || 'Unable to sign in.');
      return;
    }

    router.push('/crm');
  };

  return (
    <main className="min-h-screen bg-[#07131f] text-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Lock size={24} />
          </div>
          <p className="label-caps text-accent">CRM Portal</p>
          <h1 className="section-headline text-white">Secure login for guest inquiry management</h1>
          <p className="max-w-2xl text-muted-foreground mx-auto">
            Access the CRM dashboard to review and manage submitted inquiries for Blue Coral
            Landing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          {error ? (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <label className="grid gap-2 text-sm text-muted-foreground">
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </label>

          <label className="grid gap-2 text-sm text-muted-foreground">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="luxury-btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitting ? 'Signing In...' : 'Sign In'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </main>
  );
}
