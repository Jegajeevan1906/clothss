import { useState } from 'react';
import { useStore } from '../../lib/store';
import { StarRating } from '../../components/StarRating';
import { formatDate } from '../../lib/format';

export function AdminReviews() {
  const { products } = useStore();
  const [productFilter, setProductFilter] = useState('all');

  const allReviews = products.flatMap((p) => p.reviews.map((r) => ({ ...r, productName: p.name, productId: p.id })));
  const filtered = productFilter === 'all' ? allReviews : allReviews.filter((r) => r.productId === productFilter);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reviews</h1>
      <p className="mt-1 text-sm text-muted">{allReviews.length} customer reviews across the catalog.</p>

      <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="input mt-4 max-w-xs">
        <option value="all">All Products</option>
        {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <div className="mt-5 space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-xl border border-line bg-graphite-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{r.author} <span className="text-xs text-muted">on {r.productName}</span></div>
                <StarRating rating={r.rating} size={12} />
              </div>
              <span className="text-xs text-muted">{formatDate(r.date)}</span>
            </div>
            <div className="mt-1 text-sm font-semibold">{r.title}</div>
            <p className="mt-1 text-sm text-muted">{r.body}</p>
            {r.verified && <span className="mt-1 inline-block text-[11px] text-success">Verified Purchase</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
