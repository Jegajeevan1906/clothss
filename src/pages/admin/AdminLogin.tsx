import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Field } from '../auth/Login';

export function AdminLogin() {
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Admin';
    login(name, email || 'admin@example.com');
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-8 shadow-2xl border border-hairline">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">Admin Access</h2>
            <p className="mt-2 text-sm text-muted">Sign in to the Kinetic admin console</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <Field icon={Mail} type="email" placeholder="Admin Email" value={email} onChange={setEmail} required />
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} required />
            <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-canvas hover:bg-primary/90">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
