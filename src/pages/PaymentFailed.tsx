import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export function PaymentFailed() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/15">
        <XCircle size={34} className="text-danger" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold">Payment Failed</h1>
      <p className="mt-2 text-sm text-muted">Your payment could not be processed. No amount has been deducted. Please try again or use a different payment method.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/checkout" className="rounded-full bg-copper-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Retry Payment</Link>
        <Link to="/contact" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-copper-500">Contact Support</Link>
      </div>
    </div>
  );
}
