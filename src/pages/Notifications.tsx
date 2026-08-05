import { Bell, BellOff } from 'lucide-react';
import { useStore } from '../lib/store';
import { PageTitle, EmptyState } from '../components/Common';
import { formatDate } from '../lib/format';

export function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore();

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="flex items-center justify-between">
        <PageTitle title="Notifications" />
        {notifications.some((n) => !n.read) && (
          <button onClick={markAllNotificationsRead} className="mb-6 text-xs text-copper-400 hover:underline">Mark all read</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={BellOff} title="No notifications" body="You're all caught up. Order and account updates will appear here." />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${n.read ? 'border-line bg-graphite-800/50' : 'border-copper-600 bg-copper-500/5'}`}
            >
              <Bell size={16} className={`mt-0.5 shrink-0 ${n.read ? 'text-muted' : 'text-copper-500'}`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-xs text-muted">{n.body}</div>
                <div className="mt-1 text-[11px] text-muted">{formatDate(n.date)}</div>
              </div>
              {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-copper-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
