import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatINR } from '../../lib/format';

export function AdminProducts() {
  const { products, deleteProduct } = useStore();
  const [q, setQ] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Saree Catalog Management</h1>
          <p className="mt-1 text-sm text-muted">{products.length} saree listings in atelier catalog</p>
        </div>
        <Link to="/admin/products/new" className="flex items-center gap-1.5 rounded-lg bg-copper-500 px-4 py-2.5 text-xs font-semibold text-graphite-950 hover:bg-copper-400">
          <Plus size={14} /> Add Saree Product
        </Link>
      </div>

      <div className="relative mt-5 max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search saree, weaver, category..." className="w-full rounded-lg border border-line bg-graphite-800 py-2 pl-9 pr-3 text-sm outline-none focus:border-copper-500" />
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-graphite-800 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Saree Details</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Blouse &amp; Palette</th>
              <th className="px-4 py-3">Fabric</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-graphite-800/50">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img src={p.images[0]} alt="" className="h-12 w-10 rounded-lg object-cover bg-graphite-900" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted">{p.brand} · SKU: {p.sku}</div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-muted">{p.category}</td>
                <td className="px-4 py-3 text-xs text-muted">Option: {p.size} <br /> {p.color}</td>
                <td className="px-4 py-3 text-xs text-muted">{p.fabric}</td>
                <td className="px-4 py-3 font-semibold">{formatINR(p.price)}</td>
                <td className={`px-4 py-3 font-medium ${p.stock <= 5 ? 'text-danger' : 'text-muted'}`}>{p.stock}</td>
                <td className="px-4 py-3 text-muted">{p.rating.toFixed(1)}★</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/products/${p.id}/edit`} className="rounded-lg border border-line p-1.5 hover:border-copper-500"><Pencil size={13} /></Link>
                    <button onClick={() => setConfirmDelete(p.id)} className="rounded-lg border border-line p-1.5 hover:border-danger hover:text-danger"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-950/80 p-4" onClick={() => setConfirmDelete(null)}>
          <div className="w-full max-w-sm rounded-xl border border-line bg-graphite-800 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-sm font-semibold">Delete this saree product?</h3>
            <p className="mt-2 text-xs text-muted">This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmDelete(null)} className="rounded-lg border border-line px-4 py-2 text-xs">Cancel</button>
              <button onClick={() => { deleteProduct(confirmDelete); setConfirmDelete(null); }} className="rounded-lg bg-danger px-4 py-2 text-xs font-semibold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
