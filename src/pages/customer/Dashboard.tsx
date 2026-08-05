import { Link } from 'react-router-dom';
import { Package, Heart, MapPin, User, Bell, Settings as SettingsIcon, ArrowRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { PageTitle } from '../../components/Common';
import { formatINR, formatDate } from '../../lib/format';

export function Dashboard() {
  const { user, orders, wishlist, addresses } = useStore();

  const cards = [
    { icon: Package, label: 'My Orders', value: orders.length, href: '/dashboard/orders' },
    { icon: Heart, label: 'Wishlist', value: wishlist.length, href: '/wishlist' },
    { icon: MapPin, label: 'Saved Addresses', value: addresses.length, href: '/dashboard/addresses' },
    { icon: Bell, label: 'Notifications', value: '', href: '/notifications' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageTitle title={`Welcome back${user ? `, ${user.name.split(' ')[0]}` : ''}`} subtitle="Manage your orders, wishlist, and account details." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.href} className="flex flex-col gap-2 rounded-xl border border-line bg-graphite-800 p-4 hover:border-copper-500">
            <c.icon size={20} className="text-copper-500" />
            <div className="font-display text-xl font-bold">{c.value}</div>
            <div className="text-xs text-muted">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-graphite-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold">Recent Orders</h3>
          <Link to="/dashboard/orders" className="flex items-center gap-1 text-xs text-copper-400 hover:underline">View all <ArrowRight size={12} /></Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-muted">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 3).map((o) => (
              <Link key={o.id} to={`/dashboard/orders/${o.id}`} className="flex items-center justify-between rounded-lg border border-line p-3 text-sm hover:border-copper-500">
                <div>
                  <div className="font-mono-data text-xs text-muted">{o.id}</div>
                  <div className="mt-0.5">{o.items.length} item{o.items.length > 1 ? 's' : ''} · {formatDate(o.date)}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatINR(o.total)}</div>
                  <div className="text-xs text-copper-400">{o.stage}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link to="/dashboard/profile" className="flex items-center gap-3 rounded-xl border border-line bg-graphite-800 p-4 hover:border-copper-500"><User size={18} className="text-copper-500" /> Profile Details</Link>
        <Link to="/dashboard/addresses" className="flex items-center gap-3 rounded-xl border border-line bg-graphite-800 p-4 hover:border-copper-500"><MapPin size={18} className="text-copper-500" /> Saved Addresses</Link>
        <Link to="/dashboard/settings" className="flex items-center gap-3 rounded-xl border border-line bg-graphite-800 p-4 hover:border-copper-500"><SettingsIcon size={18} className="text-copper-500" /> Account Settings</Link>
      </div>
    </div>
  );
}
