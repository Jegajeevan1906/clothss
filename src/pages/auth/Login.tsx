import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useStore } from '../../lib/store';
import { AuthLayout } from './AuthLayout';

export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Demo User';
    login(name, email || 'demo.user@example.com');
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to track orders, manage your wishlist and check out faster.">
      <form onSubmit={submit} className="space-y-4">
        <Field icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} required />
        <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} required />
        <div className="flex justify-end">
          <Link to="/auth/forgot-password" className="text-xs text-copper-400 hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="w-full rounded-xl bg-copper-500 py-3 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Sign In</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New to Kinetic? <Link to="/auth/register" className="text-copper-400 hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export function Field({ icon: Icon, ...props }: { icon: typeof Mail; type: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div className="relative">
      <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.required}
        className="w-full rounded-xl border border-line bg-graphite-800 py-3 pl-10 pr-3 text-sm outline-none focus:border-copper-500"
      />
    </div>
  );
}
