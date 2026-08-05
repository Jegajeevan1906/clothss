import { Link } from 'react-router-dom';
import { IndianRupee, ShoppingCart, Package, Users, ArrowRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatINR, formatDate } from '../../lib/format';

export function AdminDashboard() {
  const { orders, products, customers } = useStore();
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.stock <= 5);

  const cards = [
    { icon: IndianRupee, label: 'Total Revenue', value: formatINR(revenue) },
    { icon: ShoppingCart, label: 'Orders', value: orders.length },
    { icon: Package, label: 'Products Listed', value: products.length },
    { icon: Users, label: 'Customers', value: customers.length },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of store performance.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-line bg-graphite-800 p-5">
            <c.icon size={20} className="text-copper-500" />
            <div className="mt-3 font-display text-xl font-bold">{c.value}</div>
            <div className="text-xs text-muted">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-graphite-800 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold">Recent Orders</h3>
            <Link to="/admin/orders" className="flex items-center gap-1 text-xs text-copper-400 hover:underline">Manage <ArrowRight size={12} /></Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-muted">No orders placed yet.</p>
          ) : (
            <div className="space-y-2">
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-lg border border-line p-3 text-sm">
                  <div>
                    <div className="font-mono-data text-xs text-muted">{o.id}</div>
                    <div className="text-xs">{o.customerName} · {formatDate(o.date)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatINR(o.total)}</div>
                    <div className="text-xs text-copper-400">{o.stage}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-line bg-graphite-800 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold">Low Stock Alerts</h3>
            <Link to="/admin/inventory" className="flex items-center gap-1 text-xs text-copper-400 hover:underline">Inventory <ArrowRight size={12} /></Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="text-sm text-muted">All products are well stocked.</p>
          ) : (
            <div className="space-y-2">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-line p-3 text-sm">
                  <span>{p.name}</span>
                  <span className="font-mono-data text-xs text-danger">{p.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
