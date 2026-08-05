import { useState } from 'react';
import { X, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product, SizeType } from '../data/types';
import { sizeFilters } from '../data/products';
import { formatINR, discountPercent } from '../lib/format';
import { RatingBadge } from './StarRating';
import { useStore } from '../lib/store';

export function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<SizeType>(product.size || 'Free Size');
  const off = discountPercent(product.price, product.mrp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="animate-scale-in relative grid w-full max-w-2xl max-h-[90vh] overflow-y-auto grid-cols-1 gap-6 overflow-hidden rounded-[24px] border border-hairline bg-card p-5 shadow-card-hover sm:grid-cols-2 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-canvas-secondary text-ink-muted transition-colors hover:bg-primary hover:text-white">
          <X size={16} />
        </button>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-canvas-secondary">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          <span className="absolute left-2.5 top-2.5 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur uppercase">
            {product.category} Saree
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">{product.brand}</span>
          <h3 className="font-serif-title text-lg font-bold text-ink">{product.name}</h3>
          <RatingBadge rating={product.rating} reviewCount={product.reviewCount} />
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-display text-xl font-extrabold text-ink">{formatINR(product.price)}</span>
            {off > 0 && <span className="text-sm text-ink-muted line-through">{formatINR(product.mrp)}</span>}
          </div>

          <div>
            <span className="text-xs font-bold uppercase text-ink-muted">Select Blouse Option</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {sizeFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s as SizeType)}
                  className={`flex h-8 px-2.5 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                    selectedSize === s ? 'border-primary bg-primary text-white' : 'border-hairline bg-card text-ink hover:border-primary/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-2 space-y-1.5 text-xs text-ink-muted">
            <li><strong>Saree Length:</strong> {product.sareeLength || '5.5 meters'}</li>
            <li><strong>Fabric:</strong> {product.fabric}</li>
            <li><strong>Blouse Piece:</strong> {product.blouseDetails || '0.8m Included'}</li>
            <li><strong>Occasion:</strong> {product.occasion || 'Festive'}</li>
          </ul>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <Award size={14} />
            <span>100% Authentic Handloom / Silk Mark Certified</span>
          </div>

          <div className="mt-auto flex gap-2.5 pt-3">
            <button
              onClick={() => { addToCart(product.id, 1, selectedSize, product.color); onClose(); }}
              className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.slug}`} onClick={onClose} className="flex-1 rounded-full border border-hairline py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
