import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Truck, ShieldCheck, RefreshCw, ZoomIn, CircleCheck, CircleX, PackageX, Ruler, Award } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatINR, discountPercent, deliveryDateFrom, formatDate } from '../lib/format';
import { Breadcrumb, EmptyState } from '../components/Common';
import { StarRating, RatingBadge } from '../components/StarRating';
import { ProductCard } from '../components/ProductCard';
import { categories, sizeFilters } from '../data/products';
import type { SizeType } from '../data/types';

const SAREE_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" fill="none"><rect width="800" height="1000" fill="#f8f5f0"/><path d="M240 200 Q 400 120 560 200 L 640 800 L 160 800 Z" fill="#e6dcd0" opacity="0.6"/><path d="M280 240 C 400 360 400 600 520 760" stroke="#7a0c1e" stroke-width="8" fill="none"/><text x="400" y="880" text-anchor="middle" fill="#7a0c1e" font-size="28" font-family="serif">Swarna Saree Atelier</text></svg>')}`;

function SareeImg({ src, alt, className, onMouseEnter, onMouseLeave }: { src: string; alt: string; className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  const [errored, setErrored] = useState(false);
  return <img src={errored ? SAREE_PLACEHOLDER : src} alt={alt} className={className} onError={() => setErrored(true)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />;
}

export function ProductDetail() {
  const { slug } = useParams();
  const { products, wishlist, toggleWishlist, addToCart, pushToast } = useStore();
  const product = products.find((p) => p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeType>(product?.size || 'Free Size');
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [tab, setTab] = useState<'specs' | 'description' | 'reviews'>('specs');
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState icon={PackageX} title="Saree not found" body="This item may have been purchased or is no longer available in our atelier." action={<Link to="/products" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-pill">Browse Saree Collection</Link>} />
      </div>
    );
  }

  const off = discountPercent(product.price, product.mrp);
  const inWishlist = wishlist.includes(product.id);
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const related = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  const checkPincode = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeResult('Enter a valid 6-digit pincode');
      return;
    }
    setPincodeResult(`Express insured shipping available — arrives by ${deliveryDateFrom(product.deliveryDays)}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[
        { label: categories.find((c) => c.id === product.category)?.label ?? '', href: `/category/${product.category}` },
        { label: product.name },
      ]} />

      <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-canvas-secondary shadow-card">
            <SareeImg
              src={(product.images || [])[activeImg] || SAREE_PLACEHOLDER}
              alt={product.name}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              className={`aspect-[3/4] w-full object-cover transition-transform duration-500 ${zoom ? 'scale-125' : 'scale-100'}`}
            />
            <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-muted shadow-sm">
              <ZoomIn size={15} />
            </div>
            {product.badges?.[0] && (
              <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white shadow-sm uppercase tracking-wider">{product.badges[0]}</span>
            )}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {(product.images || []).map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors shrink-0 ${activeImg === i ? 'border-primary' : 'border-hairline'}`}>
                <SareeImg src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Saree Info */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{product.brand}</span>
            <span className="text-hairline">•</span>
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1"><Award size={13} /> Silk Mark Authorized</span>
          </div>

          <h1 className="mt-1.5 font-serif-title text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{product.name}</h1>
          
          <div className="mt-2.5 flex items-center gap-3">
            <RatingBadge rating={product.rating} reviewCount={product.reviewCount} />
            <span className={`text-xs font-semibold ${product.stock > 0 ? 'text-success' : 'text-discount'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} weaves left)` : 'Out of Stock'}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold text-ink">{formatINR(product.price)}</span>
            {off > 0 && (
              <>
                <span className="text-ink-muted line-through">{formatINR(product.mrp)}</span>
                <span className="rounded-md bg-success/15 px-2 py-0.5 text-xs font-bold text-success">{off}% festive discount</span>
              </>
            )}
          </div>
          <div className="mt-1 text-xs text-ink-muted">Inclusive of all taxes · Cash on Delivery available · Free Transit Insurance</div>

          {/* Size / Blouse Selector */}
          <div className="mt-6 rounded-2xl border border-hairline bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink">Select Blouse Option ({selectedSize})</span>
              <button onClick={() => setShowSizeChart((v) => !v)} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                <Ruler size={13} /> Stitching &amp; Blouse Guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizeFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s as SizeType)}
                  className={`flex h-9 px-3 items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                    selectedSize === s ? 'border-primary bg-primary text-white shadow-sm' : 'border-hairline bg-canvas-secondary text-ink hover:border-primary/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {showSizeChart && (
              <div className="mt-3 rounded-xl bg-canvas-secondary p-3 text-xs text-ink-muted animate-fade-in">
                <div className="font-bold text-ink mb-1">Blouse Bust Measurements (Inches):</div>
                <div className="grid grid-cols-5 gap-1 text-center font-mono">
                  <div>Unstitched: 0.8m</div><div>Stitched S: 36"</div><div>Stitched M: 38"</div><div>Stitched L: 40"</div><div>Stitched XL: 42"</div>
                </div>
              </div>
            )}
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-2 text-xs text-ink-muted sm:grid-cols-2">
            <li><strong>Saree Length:</strong> {product.sareeLength || '5.5 meters'}</li>
            <li><strong>Blouse Fabric:</strong> {product.blouseDetails || '0.8m Included'}</li>
            <li><strong>Saree Fabric:</strong> {product.fabric}</li>
            <li><strong>Occasion:</strong> {product.occasion || 'Bridal & Festive'}</li>
            <li><strong>Weave Technique:</strong> {product.weaveCraft || 'Traditional Handloom'}</li>
            <li><strong>Color Palette:</strong> {product.color}</li>
            {product.careInstructions && <li className="sm:col-span-2"><strong>Care Instructions:</strong> {product.careInstructions}</li>}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {(product.specialFeatures || []).map((h) => (
              <span key={h} className="rounded-full border border-hairline bg-canvas-secondary px-3 py-1 text-xs font-medium text-ink-muted">{h}</span>
            ))}
          </div>

          {/* Pincode checker */}
          <div className="mt-6 rounded-2xl border border-hairline bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Truck size={16} className="text-primary" /> Check Insured Pincode Delivery</div>
            <div className="mt-2 flex gap-2">
              <input value={pincode} onChange={(e) => setPincode(e.target.value)} maxLength={6} placeholder="Enter pincode" className="w-36 rounded-full border border-hairline bg-search px-4 py-2 text-sm outline-none focus:border-primary" />
              <button onClick={checkPincode} className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover">Check</button>
            </div>
            {pincodeResult && <div className="mt-2 text-xs font-medium text-primary">{pincodeResult}</div>}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-ink-muted">
            <div className="flex items-center gap-2"><Award size={16} className="text-accent" /> 100% Silk Mark Certified</div>
            <div className="flex items-center gap-2"><RefreshCw size={16} className="text-primary" /> 7-day hassle-free exchange warranty</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addToCart(product.id, 1, selectedSize, product.color)}
              disabled={product.stock === 0}
              className="flex-1 rounded-full border border-hairline bg-card py-3.5 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
            >
              Add Saree to Cart ({selectedSize})
            </button>
            <Link
              to="/checkout"
              onClick={(e) => { if (product.stock === 0) { e.preventDefault(); return; } addToCart(product.id, 1, selectedSize, product.color); }}
              className={`flex-1 rounded-full py-3.5 text-center text-sm font-semibold text-white shadow-pill transition-colors ${product.stock === 0 ? 'pointer-events-none bg-canvas-secondary text-ink-muted' : 'bg-primary hover:bg-primary-hover'}`}
            >
              Buy Now
            </Link>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border transition-colors ${inWishlist ? 'border-primary bg-primary/10 text-primary' : 'border-hairline text-ink-muted hover:border-primary hover:text-primary'}`}
            >
              <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Specification Tabs */}
      <div className="mt-14 border-b border-hairline">
        <div className="flex gap-6 text-sm">
          {(['specs', 'description', 'reviews'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`border-b-2 py-3 font-semibold capitalize transition-colors ${tab === t ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'}`}>
              {t === 'specs' ? 'Saree Specifications' : t}
              {t === 'reviews' && ` (${product.reviews.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        {tab === 'specs' && (
          <div className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {([
              ['Weaver / Brand', product.brand],
              ['Saree Name', product.name],
              ['SKU / Model', product.sku],
              ['Category', product.category.toUpperCase() + ' SAREE'],
              ['Saree Length', product.sareeLength || '5.5 Meters'],
              ['Blouse Fabric', product.blouseDetails || '0.8 Meter Included'],
              ['Color & Palette', product.color],
              ['Fabric Purity', product.fabric],
              ['Occasion', product.occasion || 'Bridal & Festive'],
              ['Weave Technique', product.weaveCraft || 'Traditional Handloom'],
              product.careInstructions ? ['Care Instructions', product.careInstructions] : null,
              product.specialFeatures ? ['Special Features', product.specialFeatures.join(', ')] : null,
            ].filter(Boolean) as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-hairline py-2.5 text-sm">
                <span className="text-ink-muted">{k}</span>
                <span className="text-right font-semibold text-ink">{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'description' && (
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-ink-muted">
            <p>{product.description}</p>
            <div className="flex items-center gap-2 text-success"><CircleCheck size={16} /> {product.stock > 0 ? `${product.stock} weaves ready for dispatch` : 'Currently out of stock'}</div>
            {product.stock === 0 && <div className="flex items-center gap-2 text-discount"><CircleX size={16} /> Notify me when back on loom</div>}
          </div>
        )}
        {tab === 'reviews' && (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-card p-5 shadow-card">
              <div className="font-display text-4xl font-extrabold text-primary">{product.rating.toFixed(1)}</div>
              <div>
                <StarRating rating={product.rating} size={16} />
                <div className="mt-1 text-xs text-ink-muted">{product.reviewCount} verified patron reviews</div>
              </div>
            </div>
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b border-hairline pb-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-ink">{r.author}</div>
                  <span className="text-xs text-ink-muted">{formatDate(r.date)}</span>
                </div>
                <StarRating rating={r.rating} size={13} />
                <div className="mt-1 text-sm font-semibold text-ink">{r.title}</div>
                <p className="mt-1 text-sm text-ink-muted">{r.body}</p>
                {r.verified && <span className="mt-1 inline-block text-[11px] font-semibold text-success">Verified Saree Purchase</span>}
              </div>
            ))}
            <button onClick={() => pushToast('Review submission is disabled in this demo', 'info')} className="rounded-full border border-hairline bg-card px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-primary hover:text-primary">
              Write a Review
            </button>
          </div>
        )}
      </div>

      {similar.length > 0 && (
        <section className="py-8">
          <h3 className="mb-4 font-serif-title text-xl font-extrabold text-ink">Similar Saree Weaves</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section className="py-8">
          <h3 className="mb-4 font-serif-title text-xl font-extrabold text-ink">More from {product.brand}</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
