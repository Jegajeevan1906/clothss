import { useStore } from '../../lib/store';
import type { Product } from '../../data/types';

export function AdminInventory() {
  const { products, updateProduct } = useStore();

  const setStock = (p: Product, stock: number) => updateProduct({ ...p, stock: Math.max(0, stock) });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Inventory</h1>
      <p className="mt-1 text-sm text-muted">Adjust stock levels — changes reflect instantly on the storefront.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-graphite-800 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-graphite-800/50">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img src={p.images[0]} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  {p.name}
                </td>
                <td className="px-4 py-3 font-mono-data text-xs text-muted">{p.id.toUpperCase()}</td>
                <td className="px-4 py-3 font-medium">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs ${p.stock === 0 ? 'bg-danger/15 text-danger' : p.stock <= 5 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success'}`}>
                    {p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button onClick={() => setStock(p, p.stock - 1)} className="h-7 w-7 rounded-lg border border-line hover:border-copper-500">−</button>
                    <button onClick={() => setStock(p, p.stock + 1)} className="h-7 w-7 rounded-lg border border-line hover:border-copper-500">+</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
