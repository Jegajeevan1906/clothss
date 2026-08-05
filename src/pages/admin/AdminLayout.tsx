import { NavLink, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, BarChart3, Package, Boxes, ListTree, ShoppingCart, Users, Ticket, Star, Bell, Settings, ArrowLeft, Menu, X,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { AdminLogin } from './AdminLogin';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: ListTree },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="border-b border-hairline px-5 py-5">
        <Link to="/" className="font-display text-lg font-extrabold text-ink">KINETIC<span className="text-primary">.</span></Link>
        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Admin Console</div>
      </div>
      <nav className="space-y-0.5 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-ink-muted hover:bg-canvas-secondary hover:text-ink'}`
            }
          >
            <item.icon size={16} /> {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-hairline p-3">
        <Link to="/" className="flex items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-medium text-ink-muted hover:text-ink">
          <ArrowLeft size={14} /> Back to store
        </Link>
      </div>
    </>
  );
}

export function AdminLayout() {
  const [mobileNav, setMobileNav] = useState(false);
  const { user } = useStore();

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <aside className="hidden w-64 shrink-0 border-r border-hairline bg-card sm:block">
        <SidebarNav />
      </aside>

      <div className="min-w-0 flex-1 overflow-x-hidden">
        <div className="flex items-center justify-between border-b border-hairline bg-card px-4 py-3 sm:hidden">
          <button onClick={() => setMobileNav(true)} className="flex items-center gap-2 text-ink" aria-label="Open menu">
            <Menu size={20} /> <span className="font-display text-sm font-bold">Kinetic Admin</span>
          </button>
          <Link to="/" className="text-xs font-semibold text-primary">Exit</Link>
        </div>

        {mobileNav && (
          <div className="fixed inset-0 z-50 flex sm:hidden">
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setMobileNav(false)} />
            <div className="relative h-full w-[85%] max-w-[288px] overflow-y-auto bg-canvas shadow-2xl animate-fade-in">
              <button onClick={() => setMobileNav(false)} className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-canvas-secondary text-ink-muted" aria-label="Close menu">
                <X size={16} />
              </button>
              <SidebarNav onNavigate={() => setMobileNav(false)} />
            </div>
          </div>
        )}

        <div className="p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
