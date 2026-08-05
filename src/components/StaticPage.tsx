import type { ReactNode } from 'react';
import { Breadcrumb, PageTitle } from './Common';

export function StaticPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6">
      <Breadcrumb items={[{ label: title }]} />
      <PageTitle title={title} subtitle={subtitle} />
      <div className="space-y-4 rounded-[20px] border border-hairline bg-card p-6 text-sm leading-relaxed text-ink-muted sm:p-8 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-ink">
        {children}
      </div>
    </div>
  );
}
