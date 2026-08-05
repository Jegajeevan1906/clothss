import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../lib/store';
import { categories } from '../data/products';

export function Header() {
  const { cartCount, wishlist, notifications, user, addSearchHistory } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    addSearchHistory(query.trim());
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-canvas-secondary md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="shrink-0 flex items-center gap-2">
          <span className="font-display text-2xl font-black tracking-tight text-primary">
            SWARNA<span className="text-accent">.</span>
          </span>
          <span className="hidden lg:inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
            Saree Atelier
          </span>
        </Link>

        <form onSubmit={submitSearch} className="relative hidden flex-1 max-w-xl md:block">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kanjivaram, Banarasi, Cotton Sarees, Weaves..."
            className="w-full rounded-full border border-hairline bg-search py-2.5 pl-5 pr-11 text-sm text-ink outline-none transition-all placeholder:text-ink-muted focus:border-primary focus:bg-card focus:shadow-[0_0_0_4px_rgba(122,12,30,0.1)]"
          />
          <button type="submit" aria-label="Search" className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-primary hover:text-white">
            <Search size={16} />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link to="/notifications" className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-canvas-secondary hover:text-ink sm:flex" aria-label="Notifications">
            <Bell size={19} />
            {unread > 0 && <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-discount text-[9px] font-bold text-white">{unread}</span>}
          </Link>
          <Link to="/wishlist" className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-canvas-secondary hover:text-ink sm:flex" aria-label="Wishlist">
            <Heart size={19} />
            {wishlist.length > 0 && <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">{wishlist.length}</span>}
          </Link>
          <Link to={user ? '/dashboard' : '/auth/login'} className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-canvas-secondary hover:text-ink sm:flex">
            <User size={18} />
            {user ? user.name.split(' ')[0] : 'Sign In'}
          </Link>
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full bg-primary py-2 pl-3 pr-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] sm:pl-4" aria-label="Cart">
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">{cartCount}</span>
          </Link>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={submitSearch} className="relative w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, weaves, fabrics..."
            className="w-full rounded-full border border-hairline bg-search py-2.5 pl-5 pr-11 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-primary"
          />
          <button type="submit" aria-label="Search" className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-primary hover:text-white">
            <Search size={16} />
          </button>
        </form>
      </div>

      <nav className="hidden border-t border-hairline md:block">
        <div className="mx-auto flex max-w-7xl gap-7 px-6 py-2.5 text-[13px] font-medium text-ink-muted lg:px-8">
          <Link to="/products" className="transition-colors hover:text-primary">All Sarees</Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="transition-colors hover:text-primary">{c.label}</Link>
          ))}
          <Link to="/deals" className="ml-auto text-primary font-semibold transition-colors hover:underline">Festive Offers</Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="max-h-[calc(100vh-130px)] overflow-y-auto border-t border-hairline bg-canvas px-5 py-4 md:hidden animate-fade-in shadow-lg">
          <div className="flex flex-col gap-1 text-sm">
            <Link to="/products" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 font-medium hover:bg-canvas-secondary">All Sarees</Link>
            {categories.map((c) => (
              <Link key={c.id} to={`/category/${c.id}`} onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 font-medium hover:bg-canvas-secondary">{c.label}</Link>
            ))}
            <Link to="/deals" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 font-bold text-primary hover:bg-canvas-secondary">Festive Offers</Link>
            <div className="my-2 border-t border-hairline" />
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 font-medium hover:bg-canvas-secondary">Wishlist</Link>
            <Link to="/notifications" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 font-medium hover:bg-canvas-secondary">Notifications</Link>
            <Link to={user ? '/dashboard' : '/auth/login'} onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 font-medium hover:bg-canvas-secondary">{user ? 'My Account' : 'Sign In'}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
