import { useStore } from '../../lib/store';
import { formatINR, formatDate } from '../../lib/format';

export function AdminCustomers() {
  const { customers, toggleCustomerStatus } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Customers</h1>
      <p className="mt-1 text-sm text-muted">{customers.length} registered customers.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-graphite-800 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Spent</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-graphite-800/50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.email}<div className="text-xs">{c.phone}</div></td>
                <td className="px-4 py-3 text-muted">{formatDate(c.joined)}</td>
                <td className="px-4 py-3">{c.orders}</td>
                <td className="px-4 py-3">{formatINR(c.totalSpent)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs ${c.status === 'Active' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => toggleCustomerStatus(c.id)} className="rounded-lg border border-line px-3 py-1.5 text-xs hover:border-copper-500">
                    {c.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
