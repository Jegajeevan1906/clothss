import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useStore } from '../../lib/store';
import { PageTitle, EmptyState } from '../../components/Common';
import { formatINR } from '../../lib/format';
import { RatingBadge } from '../../components/StarRating';

export function Wishlist() {
  const { wishlist, products, toggleWishlist, moveWishlistToCart } = useStore();
  const items = wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState icon={Heart} title="Your wishlist is empty" body="Save outfits and clothing items you love here to buy later."
          action={<Link to="/products" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-pill">Browse Clothing</Link>} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <PageTitle title="Wishlist" subtitle={`${items.length} saved item${items.length === 1 ? '' : 's'}`} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="rounded-[20px] border border-hairline bg-card p-4 shadow-card">
            <Link to={`/product/${p.slug}`}>
              <img src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full rounded-xl bg-canvas-secondary object-cover" />
            </Link>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{p.brand}</div>
            <Link to={`/product/${p.slug}`} className="font-display text-sm font-bold text-ink hover:text-primary line-clamp-1">{p.name}</Link>
            <div className="mt-1 text-xs text-ink-muted">Size: {p.size} · Fabric: {p.fabric}</div>
            <div className="mt-1"><RatingBadge rating={p.rating} reviewCount={p.reviewCount} /></div>
            <div className="mt-2 font-display text-base font-extrabold text-ink">{formatINR(p.price)}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => moveWishlistToCart(p.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover">
                <ShoppingCart size={13} /> Move to Cart
              </button>
              <button onClick={() => toggleWishlist(p.id)} aria-label="Remove item" className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted hover:border-discount hover:text-discount">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
