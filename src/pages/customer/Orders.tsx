import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useStore } from '../../lib/store';
import { PageTitle, EmptyState, Breadcrumb } from '../../components/Common';
import { formatINR, formatDate } from '../../lib/format';

const stageColor: Record<string, string> = {
  Placed: 'text-ice-400', Confirmed: 'text-ice-400', Packed: 'text-warning', Shipped: 'text-warning', 'Out for Delivery': 'text-copper-400', Delivered: 'text-success',
};

export function Orders() {
  const { orders } = useStore();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'My Orders' }]} />
      <PageTitle title="My Orders" subtitle={`${orders.length} order${orders.length === 1 ? '' : 's'}`} />

      {orders.length === 0 ? (
        <EmptyState icon={Package} title="No orders yet" body="Your placed orders will show up here." action={<Link to="/products" className="rounded-full bg-copper-500 px-5 py-2 text-sm font-semibold text-graphite-950">Start Shopping</Link>} />
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Link key={o.id} to={`/dashboard/orders/${o.id}`} className="block rounded-xl border border-line bg-graphite-800 p-5 hover:border-copper-500">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-mono-data text-xs font-bold text-ink">{o.id}</div>
                  <div className="text-xs text-muted">Placed on {formatDate(o.date)}</div>
                </div>
                <div className="text-right">
                  <span className={`block text-sm font-semibold ${stageColor[o.stage]}`}>{o.stage}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${o.payment_status === 'paid' ? 'text-success' : o.payment_status === 'failed' ? 'text-discount' : 'text-warning'}`}>
                    {o.payment_status}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-3 overflow-x-auto border-y border-line py-3">
                {o.items.map((it) => (
                  <div key={it.productId} className="flex min-w-[200px] gap-3">
                    <img src={it.image} alt={it.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    <div>
                      <div className="line-clamp-1 text-sm text-ink">{it.name}</div>
                      <div className="text-xs text-muted">Qty: {it.qty}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="text-muted">
                  <span className="font-medium text-ink">Payment:</span> {o.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </div>
                <div className="font-display font-bold text-ink">{formatINR(o.total)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
