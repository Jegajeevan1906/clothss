import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-12">
      <Link to="/" className="mb-8 self-center font-display text-xl font-extrabold">KINETIC<span className="text-copper-500">.</span></Link>
      <div className="rounded-2xl border border-line bg-graphite-800 p-8">
        <h1 className="font-display text-xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
