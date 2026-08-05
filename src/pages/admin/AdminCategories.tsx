import { categories } from '../../data/products';
import { useStore } from '../../lib/store';

export function AdminCategories() {
  const { products } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Categories</h1>
      <p className="mt-1 text-sm text-muted">Product categories shown across the storefront.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <div key={c.id} className="rounded-xl border border-line bg-graphite-800 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold">{c.label}</h3>
                <span className="rounded-full bg-copper-500/15 px-2 py-0.5 text-xs text-copper-400">{count} products</span>
              </div>
              <p className="mt-2 text-xs text-muted">{c.description}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-muted">Category structure is fixed in this demo build — connect a backend to support custom categories.</p>
    </div>
  );
}
