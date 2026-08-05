import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../../lib/store';

export function AdminCoupons() {
  const { coupons, toggleCoupon, addCoupon } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', description: '', discountPercent: 10, minOrder: 0 });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({ ...form, code: form.code.toUpperCase(), active: true });
    setShowForm(false);
    setForm({ code: '', description: '', discountPercent: 10, minOrder: 0 });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Coupons</h1>
          <p className="mt-1 text-sm text-muted">{coupons.length} coupon codes.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="flex items-center gap-1.5 rounded-lg bg-copper-500 px-4 py-2.5 text-xs font-semibold text-graphite-950">
          <Plus size={14} /> New Coupon
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mt-5 grid max-w-xl grid-cols-1 gap-3 rounded-xl border border-line bg-graphite-800 p-5 sm:grid-cols-2">
          <input required placeholder="Code (e.g. SAVE20)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="input" />
          <input required type="number" placeholder="Discount %" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: Number(e.target.value) })} className="input" />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input sm:col-span-2" />
          <input type="number" placeholder="Minimum order (₹)" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} className="input" />
          <button type="submit" className="rounded-lg bg-copper-500 px-4 py-2 text-xs font-semibold text-graphite-950 sm:col-span-2">Create Coupon</button>
        </form>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => (
          <div key={c.code} className="rounded-xl border border-line bg-graphite-800 p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono-data text-sm font-bold text-copper-400">{c.code}</span>
              <button onClick={() => toggleCoupon(c.code)} className={`h-6 w-11 rounded-full transition-colors ${c.active ? 'bg-copper-500' : 'bg-graphite-600'}`}>
                <span className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white transition-transform ${c.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <p className="mt-2 text-xs text-muted">{c.description}</p>
            <div className="mt-2 text-xs text-muted">Min order: ₹{c.minOrder.toLocaleString('en-IN')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
