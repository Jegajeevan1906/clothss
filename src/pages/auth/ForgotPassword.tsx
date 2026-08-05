import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Field } from './Login';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a link to reset your password.">
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 size={32} className="text-success" />
          <p className="text-sm text-muted">If an account exists for <span className="text-text">{email}</span>, a reset link has been sent.</p>
          <Link to="/auth/login" className="mt-2 text-sm text-copper-400 hover:underline">Back to Sign In</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} required />
          <button type="submit" className="w-full rounded-xl bg-copper-500 py-3 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Send Reset Link</button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        Remembered your password? <Link to="/auth/login" className="text-copper-400 hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
