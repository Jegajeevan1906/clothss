import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Circle, PackageX } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Breadcrumb, EmptyState, PageTitle } from '../../components/Common';
import { formatINR, formatDate } from '../../lib/format';
import type { OrderStage } from '../../data/types';

const stages: OrderStage[] = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

export function OrderTracking() {
  const { orderId } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState icon={PackageX} title="Order not found" body="We couldn't locate this order. Check your order ID and try again."
          action={<Link to="/dashboard/orders" className="rounded-full bg-copper-500 px-5 py-2 text-sm font-semibold text-graphite-950">Back to Orders</Link>} />
      </div>
    );
  }

  const currentIdx = stages.indexOf(order.stage);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'My Orders', href: '/dashboard/orders' }, { label: order.id }]} />
      <PageTitle title={`Order ${order.id}`} subtitle={`Placed on ${formatDate(order.date)}`} />

      <div className="rounded-xl border border-line bg-graphite-800 p-6">
        <h3 className="mb-6 font-display text-sm font-semibold">Order Status</h3>
        <div className="relative">
          {stages.map((s, i) => {
            const done = i <= currentIdx;
            return (
              <div key={s} className="relative flex gap-4 pb-8 last:pb-0">
                {i < stages.length - 1 && (
                  <div className={`absolute left-[11px] top-6 h-full w-0.5 ${i < currentIdx ? 'bg-copper-500' : 'bg-line'}`} />
                )}
                {done ? <CheckCircle2 size={24} className="shrink-0 text-copper-500" /> : <Circle size={24} className="shrink-0 text-line" />}
                <div>
                  <div className={`text-sm font-medium ${done ? 'text-text' : 'text-muted'}`}>{s}</div>
                  {i === currentIdx && <div className="text-xs text-copper-400">Current status</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-graphite-800 p-6">
        <h3 className="mb-4 font-display text-sm font-semibold">Items</h3>
        <div className="space-y-3">
          {order.items.map((it) => (
            <div key={it.productId} className="flex items-center gap-3 text-sm">
              <img src={it.image} alt={it.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="flex-1">{it.name} × {it.qty}</div>
              <div className="font-medium">{formatINR(it.price * it.qty)}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-line pt-3 font-display font-bold">
          <span>Total</span><span>{formatINR(order.total)}</span>
        </div>
        <div className="mt-4 text-xs text-muted">
          Delivering to {order.address.name}, {order.address.line1}, {order.address.city} {order.address.pincode}
        </div>
      </div>
    </div>
  );
}
