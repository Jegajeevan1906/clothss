import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { useStore } from '../lib/store';

const icons = { success: CheckCircle2, error: XCircle, info: Info };
const colors = { success: 'text-success', error: 'text-discount', info: 'text-primary' };

export function ToastHost() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => {
        const Icon = icons[t.tone];
        return (
          <div key={t.id} className="animate-toast-in pointer-events-auto flex items-center gap-2.5 rounded-full border border-hairline bg-card px-5 py-3 text-sm font-medium text-ink shadow-card-hover">
            <Icon size={17} className={colors[t.tone]} />
            {t.message}
          </div>
        );
      })}
    </div>
  );
}
