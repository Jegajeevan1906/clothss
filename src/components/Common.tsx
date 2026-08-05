import { Link } from 'react-router-dom';
import { ChevronRight, type LucideIcon } from 'lucide-react';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
      <Link to="/" className="hover:text-primary">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} />
          {item.href ? <Link to={item.href} className="hover:text-primary">{item.label}</Link> : <span className="text-ink">{item.label}</span>}
        </span>
      ))}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="mb-1.5 text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</div>}
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, body, action }: { icon: LucideIcon; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-hairline bg-card py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-canvas-secondary">
        <Icon size={26} className="text-ink-muted" />
      </div>
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink-muted">{body}</p>
      {action}
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-[20px] border border-hairline bg-card">
          <div className="skeleton aspect-[4/3]" />
          <div className="space-y-2 p-4">
            <div className="skeleton h-3 w-1/2 rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>}
    </div>
  );
}
