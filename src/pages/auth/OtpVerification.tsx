import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { useStore } from '../../lib/store';

export function OtpVerification() {
  const { state } = useLocation() as { state?: { name?: string; email?: string } };
  const { login, pushToast } = useStore();
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 3) refs.current[i + 1]?.focus();
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (digits.join('').length < 4) {
      pushToast('Enter the 4-digit code', 'error');
      return;
    }
    login(state?.name || 'Demo User', state?.email || 'demo.user@example.com');
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Verify your number" subtitle={`Enter the 4-digit code sent to your phone (demo: any 4 digits work).`}>
      <form onSubmit={verify} className="space-y-6">
        <div className="flex justify-center gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              maxLength={1}
              className="h-14 w-12 rounded-xl border border-line bg-graphite-900 text-center text-xl outline-none focus:border-copper-500"
            />
          ))}
        </div>
        <button type="submit" className="w-full rounded-xl bg-copper-500 py-3 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Verify &amp; Continue</button>
        <button type="button" onClick={() => pushToast('OTP resent', 'info')} className="w-full text-center text-xs text-copper-400 hover:underline">Resend code</button>
      </form>
    </AuthLayout>
  );
}
