import { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatDate } from '../../lib/format';

export function AdminNotifications() {
  const { notifications, pushToast } = useStore();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    pushToast('Notification broadcast to all customers (demo)', 'success');
    setTitle('');
    setBody('');
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Notifications</h1>
      <p className="mt-1 text-sm text-muted">Broadcast an announcement to all storefront customers.</p>

      <form onSubmit={send} className="mt-6 max-w-xl space-y-3 rounded-xl border border-line bg-graphite-800 p-5">
        <input required placeholder="Notification title" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full" />
        <textarea required rows={3} placeholder="Message body" value={body} onChange={(e) => setBody(e.target.value)} className="input w-full resize-none" />
        <button type="submit" className="flex items-center gap-1.5 rounded-lg bg-copper-500 px-4 py-2.5 text-xs font-semibold text-graphite-950"><Send size={13} /> Send Broadcast</button>
      </form>

      <h3 className="mb-3 mt-8 font-display text-sm font-semibold">Recent Notifications Sent</h3>
      <div className="space-y-2">
        {notifications.slice(0, 8).map((n) => (
          <div key={n.id} className="rounded-lg border border-line bg-graphite-800 p-3 text-sm">
            <div className="flex justify-between"><span className="font-medium">{n.title}</span><span className="text-xs text-muted">{formatDate(n.date)}</span></div>
            <div className="text-xs text-muted">{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
