import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { useStore } from '../../lib/store';
import { categories } from '../../data/products';
import { formatINR } from '../../lib/format';

const COLORS = ['#C6793F', '#5EA8C9', '#4CAF6D', '#E5A33D', '#DE9563', '#7DC2E0'];

export function AdminAnalytics() {
  const { orders, products } = useStore();

  const salesByMonth = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((o) => {
      const key = new Date(o.date).toLocaleDateString('en-IN', { month: 'short' });
      map.set(key, (map.get(key) ?? 0) + o.total);
    });
    if (map.size === 0) return [{ month: 'No data', total: 0 }];
    return Array.from(map.entries()).map(([month, total]) => ({ month, total }));
  }, [orders]);

  const categoryShare = useMemo(() => {
    return categories.map((c) => ({ name: c.label, value: products.filter((p) => p.category === c.id).length }));
  }, [products]);

  const topProducts = useMemo(() => [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5), [products]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Analytics</h1>
      <p className="mt-1 text-sm text-muted">Sales trends and catalog composition.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-graphite-800 p-5">
          <h3 className="mb-4 font-display text-sm font-semibold">Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" />
              <XAxis dataKey="month" stroke="#8B909C" fontSize={12} />
              <YAxis stroke="#8B909C" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: '#1D2026', border: '1px solid #2A2E37', borderRadius: 8, fontSize: 12 }}
                formatter={(v) => formatINR(Number(v))}
              />
              <Bar dataKey="total" fill="#C6793F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-line bg-graphite-800 p-5">
          <h3 className="mb-4 font-display text-sm font-semibold">Catalog by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {categoryShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1D2026', border: '1px solid #2A2E37', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
            {categoryShare.map((c, i) => (
              <span key={c.name} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-graphite-800 p-5">
        <h3 className="mb-4 font-display text-sm font-semibold">Top Products by Reviews</h3>
        <div className="space-y-3">
          {topProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-xs">{p.name}</span>
              <div className="h-2 flex-1 rounded-full bg-graphite-700">
                <div className="h-2 rounded-full bg-copper-500" style={{ width: `${(p.reviewCount / topProducts[0].reviewCount) * 100}%` }} />
              </div>
              <span className="w-10 shrink-0 text-right font-mono-data text-xs text-muted">{p.reviewCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
