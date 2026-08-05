import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatINR, formatDate } from '../../lib/format';
import type { OrderStage } from '../../data/types';

const stages: OrderStage[] = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

export function AdminOrders() {
  const { orders, updateOrderStage, markOrderAsPaid } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = [
    'All', 'Online Paid', 'COD Pending', 'COD Paid', 'Payment Failed',
    'Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      // Search
      const searchStr = search.toLowerCase();
      const matchesSearch = !search || 
        o.id.toLowerCase().includes(searchStr) ||
        o.customerName.toLowerCase().includes(searchStr) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(searchStr)) ||
        (o.address.phone && o.address.phone.includes(searchStr));

      if (!matchesSearch) return false;

      // Filter
      if (filter === 'All') return true;
      if (filter === 'Online Paid') return o.payment_method === 'online' && o.payment_status === 'paid';
      if (filter === 'COD Pending') return o.payment_method === 'cod' && o.payment_status === 'pending';
      if (filter === 'COD Paid') return o.payment_method === 'cod' && o.payment_status === 'paid';
      if (filter === 'Payment Failed') return o.payment_status === 'failed';
      
      // Order status filters
      if (stages.includes(filter as OrderStage)) return o.stage === filter;

      return true;
    });
  }, [orders, search, filter]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-muted">{orders.length} total orders.</p>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by ID, name, email, or phone..." 
            className="input pl-9"
          />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input md:w-auto">
          {filters.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No orders found matching the current filters.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {filteredOrders.map((o) => (
            <div key={o.id} className="rounded-xl border border-line bg-graphite-800 p-4">
              <button onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="flex w-full flex-wrap items-center justify-between gap-2 text-left">
                <div>
                  <div className="font-mono-data text-xs text-muted font-bold text-ink">{o.id}</div>
                  <div className="text-sm">{o.customerName} · {formatDate(o.date)}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-muted uppercase tracking-wider">{o.payment_method}</div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${o.payment_status === 'paid' ? 'text-success' : o.payment_status === 'failed' ? 'text-discount' : 'text-warning'}`}>
                      {o.payment_status}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold block">{formatINR(o.total)}</span>
                    <span className="rounded-full bg-copper-500/15 px-2.5 py-1 text-xs text-copper-400 mt-1 inline-block">{o.stage}</span>
                  </div>
                </div>
              </button>

              {expanded === o.id && (
                <div className="mt-4 border-t border-line pt-4 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-bold mb-2">Customer Information</h4>
                    <div className="text-sm text-muted">
                      {o.customerName} <br/>
                      {o.customerEmail} <br/>
                      {o.address.phone} <br/>
                      {o.address.line1}, {o.address.city}, {o.address.state} {o.address.pincode}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h4 className="text-sm font-bold mb-2">Product Information</h4>
                    <div className="space-y-3">
                      {o.items.map((it) => (
                        <div key={it.productId} className="flex items-center gap-4 text-sm">
                          <img src={it.image} alt="" className="h-12 w-12 rounded-lg object-cover bg-graphite-900" />
                          <div className="flex-1">
                            <div className="text-ink font-medium">{it.name}</div>
                            <div className="text-xs text-muted">SKU: {it.sku || 'N/A'} · Brand: {it.brand || 'N/A'}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatINR(it.price)} × {it.qty}</div>
                            <div className="font-bold">{formatINR(it.total_price || (it.price * it.qty))}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div>
                    <h4 className="text-sm font-bold mb-2">Price Breakdown</h4>
                    <div className="space-y-1 text-sm text-muted w-64">
                      <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(o.items.reduce((sum, it) => sum + (it.total_price || (it.price * it.qty)), 0))}</span></div>
                      {o.coupon_code && (
                        <div className="flex justify-between text-success"><span>Coupon ({o.coupon_code})</span><span>- {formatINR(o.coupon_discount || 0)}</span></div>
                      )}
                      <div className="flex justify-between"><span>GST</span><span>{formatINR(o.gst_amount || 0)}</span></div>
                      <div className="flex justify-between"><span>Shipping</span><span>{formatINR(o.shipping_amount || 0)}</span></div>
                      <div className="flex justify-between font-bold text-ink border-t border-line pt-1 mt-1"><span>Total</span><span>{formatINR(o.total)}</span></div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h4 className="text-sm font-bold mb-2">Payment Information</h4>
                    <div className="text-sm text-muted grid grid-cols-2 gap-y-1">
                      <div>Method:</div><div className="uppercase">{o.payment_method}</div>
                      <div>Status:</div><div className={`uppercase font-bold ${o.payment_status === 'paid' ? 'text-success' : o.payment_status === 'failed' ? 'text-discount' : 'text-warning'}`}>{o.payment_status}</div>
                      {o.payment_gateway && <><div>Gateway:</div><div>{o.payment_gateway}</div></>}
                      {o.payment_transaction_id && <><div>Transaction ID:</div><div className="font-mono-data text-xs">{o.payment_transaction_id}</div></>}
                      {o.payment_completed_at && <><div>Completed At:</div><div>{formatDate(o.payment_completed_at)}</div></>}
                    </div>

                    {o.payment_method === 'cod' && o.payment_status === 'pending' && (
                      <div className="mt-4">
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to mark this COD order as Paid?')) {
                              markOrderAsPaid(o.id);
                            }
                          }}
                          className="rounded-full bg-success px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-success/90"
                        >
                          Mark Payment as Paid
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Order Status Action */}
                  <div className="border-t border-line pt-4">
                    <label className="mb-2 block text-sm font-bold">Update Order Status</label>
                    <select
                      value={o.stage}
                      onChange={(e) => updateOrderStage(o.id, e.target.value as OrderStage)}
                      className="input max-w-xs"
                    >
                      {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
