import { useState } from 'react';
import { useStore } from '../../lib/store';

export function AdminSettings() {
  const { pushToast } = useStore();
  const [storeName, setStoreName] = useState('Kinetic Retail India Pvt Ltd');
  const [supportEmail, setSupportEmail] = useState('support@kinetic.in');
  const [gst, setGst] = useState(18);
  const [freeShipThreshold, setFreeShipThreshold] = useState(50000);
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted">Store-wide configuration for this demo build.</p>

      <div className="mt-6 max-w-xl space-y-4 rounded-xl border border-line bg-graphite-800 p-6">
        <div>
          <label className="mb-1 block text-xs text-muted">Store Name</label>
          <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="input w-full" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Support Email</label>
          <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="input w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-muted">GST Rate (%)</label>
            <input type="number" value={gst} onChange={(e) => setGst(Number(e.target.value))} className="input w-full" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Free Shipping Above (₹)</label>
            <input type="number" value={freeShipThreshold} onChange={(e) => setFreeShipThreshold(Number(e.target.value))} className="input w-full" />
          </div>
        </div>
        <label className="flex items-center justify-between text-sm">
          Maintenance mode
          <button type="button" onClick={() => setMaintenance((v) => !v)} className={`h-6 w-11 rounded-full transition-colors ${maintenance ? 'bg-copper-500' : 'bg-graphite-600'}`}>
            <span className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white transition-transform ${maintenance ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </label>
        <button onClick={() => pushToast('Store settings saved', 'success')} className="rounded-lg bg-copper-500 px-5 py-2.5 text-xs font-semibold text-graphite-950">Save Settings</button>
      </div>
    </div>
  );
}
