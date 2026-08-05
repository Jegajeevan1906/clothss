import { useState } from 'react';
import { Breadcrumb, PageTitle } from '../../components/Common';
import { useStore } from '../../lib/store';

export function Settings() {
  const { pushToast } = useStore();
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoEmails, setPromoEmails] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
      <PageTitle title="Account Settings" />

      <div className="space-y-4 rounded-xl border border-line bg-graphite-800 p-6">
        <h3 className="font-display text-sm font-semibold">Notification Preferences</h3>
        <Toggle label="Order status updates" checked={orderUpdates} onChange={setOrderUpdates} />
        <Toggle label="Promotional emails & deals" checked={promoEmails} onChange={setPromoEmails} />
        <Toggle label="SMS alerts" checked={smsAlerts} onChange={setSmsAlerts} />
      </div>

      <div className="mt-6 space-y-4 rounded-xl border border-line bg-graphite-800 p-6">
        <h3 className="font-display text-sm font-semibold">Security</h3>
        <Toggle label="Two-factor authentication" checked={twoFactor} onChange={setTwoFactor} />
      </div>

      <button onClick={() => pushToast('Settings saved', 'success')} className="mt-6 rounded-lg bg-copper-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400">
        Save Settings
      </button>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between text-sm">
      {label}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`h-6 w-11 rounded-full transition-colors ${checked ? 'bg-copper-500' : 'bg-graphite-600'}`}
      >
        <span className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </label>
  );
}
