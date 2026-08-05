import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Field } from './Login';

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/auth/otp', { state: form });
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join Kinetic for faster checkout, order tracking and exclusive deals.">
      <form onSubmit={submit} className="space-y-4">
        <Field icon={User} type="text" placeholder="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
        <Field icon={Phone} type="tel" placeholder="Phone number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
        <Field icon={Lock} type="password" placeholder="Create password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />
        <button type="submit" className="w-full rounded-xl bg-copper-500 py-3 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Continue</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link to="/auth/login" className="text-copper-400 hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
