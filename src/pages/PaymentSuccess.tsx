import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatINR, formatDate } from '../lib/format';

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get('order');
  const { orders } = useStore();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 size={34} className="text-success" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-sm text-muted">Thank you! Your order has been placed and a confirmation has been sent to your registered email.</p>

      {order && (
        <div className="mt-6 w-full rounded-xl border border-line bg-graphite-800 p-5 text-left text-sm">
          <div className="flex justify-between"><span className="text-muted">Order ID</span><span className="font-mono-data">{order.id}</span></div>
          <div className="flex justify-between"><span className="text-muted">Date</span><span>{formatDate(order.date)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Amount Paid</span><span className="font-semibold">{formatINR(order.total)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Payment Method</span><span className="capitalize">{order.paymentMethod}</span></div>
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <Link to="/dashboard/orders" className="rounded-full bg-copper-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Track Order</Link>
        <Link to="/products" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-copper-500">Continue Shopping</Link>
      </div>
    </div>
  );
}
