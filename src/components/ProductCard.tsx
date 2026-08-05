import { Link } from 'react-router-dom';
import { Heart, Eye, Truck, Sparkles } from 'lucide-react';
import type { Product } from '../data/types';
import { formatINR, discountPercent, deliveryDateFrom } from '../lib/format';
import { RatingBadge } from './StarRating';
import { useStore } from '../lib/store';
import { useState } from 'react';
import { QuickViewModal } from './QuickViewModal';

const SAREE_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" fill="none"><rect width="400" height="500" fill="#f8f5f0"/><path d="M120 100 Q 200 60 280 100 L 320 400 L 80 400 Z" fill="#e6dcd0" opacity="0.6"/><path d="M140 120 C 200 180 200 300 260 380" stroke="#7a0c1e" stroke-width="4" fill="none"/><text x="200" y="440" text-anchor="middle" fill="#7a0c1e" font-size="14" font-family="serif">Swarna Saree Atelier</text></svg>`)}`;

function SareeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <img
      src={errored ? SAREE_PLACEHOLDER : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [quickView, setQuickView] = useState(false);
  const inWishlist = wishlist.includes(product.id);
  const off = discountPercent(product.price, product.mrp);

  const primaryImage = product.images?.[0] || SAREE_PLACEHOLDER;

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-[20px] border border-hairline bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-hover">
        <div className="relative aspect-[3/4] overflow-hidden bg-canvas-secondary">
          <Link to={`/product/${product.slug}`}>
            <SareeImage
              src={primaryImage}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>
          {product.badges?.[0] && (
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <Sparkles size={10} /> {product.badges[0]}
            </span>
          )}
          {off > 0 && (
            <span className="absolute right-2.5 top-2.5 rounded-full bg-discount px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              {off}% OFF
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 p-2.5 transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur transition-colors ${inWishlist ? 'bg-primary text-white' : 'bg-white/90 text-ink hover:bg-primary hover:text-white'}`}
            >
              <Heart size={15} className={inWishlist ? 'fill-current' : ''} />
            </button>
            <button
              onClick={() => setQuickView(true)}
              aria-label="Quick view"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur transition-colors hover:bg-primary hover:text-white"
            >
              <Eye size={15} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-ink-muted">
            <span className="uppercase tracking-wider text-primary font-bold">{product.brand}</span>
            <span>{product.sareeLength || '5.5m Saree'}</span>
          </div>
          <Link to={`/product/${product.slug}`} className="font-serif-title text-sm font-bold leading-snug text-ink transition-colors hover:text-primary line-clamp-2 min-h-[42px]">
            {product.name}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-ink-muted">
            <span>Fabric: {product.fabric}</span>
            {product.blouseDetails && (
              <>
                <span className="text-hairline">•</span>
                <span className="line-clamp-1">{product.blouseDetails}</span>
              </>
            )}
          </div>
          <RatingBadge rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-lg font-extrabold text-ink">{formatINR(product.price)}</span>
            {off > 0 && <span className="text-xs text-ink-muted line-through">{formatINR(product.mrp)}</span>}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <Truck size={12} className="text-primary" />
            <span>Delivery by {deliveryDateFrom(product.deliveryDays)}</span>
          </div>
          <button
            onClick={() => addToCart(product.id)}
            disabled={product.stock === 0}
            className="mt-2.5 w-full rounded-full bg-primary py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-canvas-secondary disabled:text-ink-muted"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add Saree to Cart'}
          </button>
        </div>
      </div>
      {quickView && <QuickViewModal product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}
