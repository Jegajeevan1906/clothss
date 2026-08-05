import { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Breadcrumb, PageTitle } from '../../components/Common';

export function Addresses() {
  const { addresses, addAddress } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: 'Home', name: '', line1: '', city: '', state: '', pincode: '', phone: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(form);
    setShowForm(false);
    setForm({ label: 'Home', name: '', line1: '', city: '', state: '', pincode: '', phone: '' });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Addresses' }]} />
      <div className="flex items-center justify-between">
        <PageTitle title="Saved Addresses" />
        <button onClick={() => setShowForm((v) => !v)} className="mb-6 flex items-center gap-1.5 rounded-lg bg-copper-500 px-3 py-2 text-xs font-semibold text-graphite-950">
          <Plus size={14} /> Add Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-line bg-graphite-800 p-5 sm:grid-cols-2">
          <input required placeholder="Label (Home/Work)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input" />
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          <input required placeholder="Address line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="input sm:col-span-2" />
          <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input" />
          <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="input" />
          <input required placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="input" />
          <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
          <button type="submit" className="rounded-lg bg-copper-500 px-4 py-2 text-xs font-semibold text-graphite-950 sm:col-span-2">Save Address</button>
        </form>
      )}

      <div className="space-y-3">
        {addresses.map((a) => (
          <div key={a.id} className="flex items-start gap-3 rounded-xl border border-line bg-graphite-800 p-4">
            <MapPin size={18} className="mt-0.5 text-copper-500" />
            <div className="text-sm">
              <div className="font-medium">{a.label} — {a.name} {a.isDefault && <span className="ml-2 rounded-full bg-copper-500/15 px-2 py-0.5 text-[10px] text-copper-400">Default</span>}</div>
              <div className="text-muted">{a.line1}, {a.city}, {a.state} {a.pincode}</div>
              <div className="text-muted">{a.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
