import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Plus, CreditCard, Wallet, Landmark, Truck, Loader2 } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatINR, deliveryDateFrom } from '../lib/format';
import { PageTitle, EmptyState } from '../components/Common';
import { ShoppingBag } from 'lucide-react';
import type { Address } from '../data/types';

const paymentMethods = [
  { id: 'razorpay', label: 'Razorpay (UPI / Cards / Netbanking)', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', icon: Wallet },
  { id: 'emi', label: 'No-Cost EMI', icon: Landmark },
];

export function Checkout() {
  const { cart, products, addresses, addAddress, placeOrder, orderSummary, deliveryMethod, setDeliveryMethod } = useStore();
  const navigate = useNavigate();
  const activeItems = cart.filter((c) => !c.savedForLater);
  const [selectedAddr, setSelectedAddr] = useState(addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id);
  const [showAddForm, setShowAddForm] = useState(addresses.length === 0);
  const [payment, setPayment] = useState('razorpay');
  const [placing, setPlacing] = useState(false);
  const [simulateFail, setSimulateFail] = useState(false);
  const [form, setForm] = useState({ label: 'Home', name: '', line1: '', city: '', state: '', pincode: '', phone: '' });

  const find = (id: string) => products.find((p) => p.id === id);
  const { subtotal, couponCode, couponDiscount, gstAmount, shippingAmount, finalTotal } = orderSummary;

  if (activeItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState icon={ShoppingBag} title="Nothing to check out" body="Your cart is empty. Add a clothing item to proceed to checkout."
          action={<Link to="/products" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-pill">Browse Clothing</Link>} />
      </div>
    );
  }

  const submitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(form);
    setShowAddForm(false);
    setForm({ label: 'Home', name: '', line1: '', city: '', state: '', pincode: '', phone: '' });
  };

  const confirmOrder = () => {
    const addr = addresses.find((a) => a.id === selectedAddr);
    if (!addr) return;
    setPlacing(true);
    setTimeout(() => {
      const isCod = payment === 'cod';
      const actualPaymentMethod = isCod ? 'cod' : 'online';

      if (simulateFail && !isCod) {
        // Record failed online payment
        placeOrder(addr, actualPaymentMethod, 'failed', null);
        navigate('/payment-failed');
        return;
      }

      // Successful flow
      const transactionId = isCod ? null : `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const status = isCod ? 'pending' : 'paid';

      const order = placeOrder(addr, actualPaymentMethod, status, transactionId);
      navigate(`/payment-success?order=${order.id}`);
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-8">
      <PageTitle title="Checkout" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Address */}
          <section className="rounded-2xl border border-hairline bg-card p-5 shadow-card sm:p-6">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-ink"><MapPin size={16} className="text-primary" /> Delivery Address</h3>
            <div className="space-y-2">
              {addresses.map((a: Address) => (
                <label key={a.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors ${selectedAddr === a.id ? 'border-primary bg-primary/5' : 'border-hairline'}`}>
                  <input type="radio" checked={selectedAddr === a.id} onChange={() => setSelectedAddr(a.id)} className="mt-1 h-4 w-4 accent-primary" />
                  <div>
                    <div className="font-semibold text-ink">{a.label} — {a.name}</div>
                    <div className="text-xs text-ink-muted">{a.line1}, {a.city}, {a.state} {a.pincode}</div>
                    <div className="text-xs text-ink-muted">{a.phone}</div>
                  </div>
                </label>
              ))}
            </div>
            {!showAddForm ? (
              <button onClick={() => setShowAddForm(true)} className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                <Plus size={14} /> Add new address
              </button>
            ) : (
              <form onSubmit={submitAddress} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input required placeholder="Label (Home/Work)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input" />
                <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
                <input required placeholder="Address line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="input sm:col-span-2" />
                <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input" />
                <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="input" />
                <input required placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="input" />
                <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
                <div className="flex gap-2 sm:col-span-2">
                  <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-pill">Save Address</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="rounded-full border border-hairline px-5 py-2.5 text-xs font-semibold text-ink">Cancel</button>
                </div>
              </form>
            )}
          </section>

          {/* Delivery option */}
          <section className="rounded-2xl border border-hairline bg-card p-5 shadow-card sm:p-6">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-ink"><Truck size={16} className="text-primary" /> Delivery Option</h3>
            <div className="space-y-2">
              <label className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-3.5 text-sm transition-colors ${deliveryMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-hairline'}`}>
                <span className="flex items-center gap-2 text-ink"><input type="radio" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} className="h-4 w-4 accent-primary" /> Standard — by {deliveryDateFrom(4)}</span>
                <span className="text-ink-muted">{subtotal > 1499 ? 'Free' : formatINR(99)}</span>
              </label>
              <label className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-3.5 text-sm transition-colors ${deliveryMethod === 'express' ? 'border-primary bg-primary/5' : 'border-hairline'}`}>
                <span className="flex items-center gap-2 text-ink"><input type="radio" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} className="h-4 w-4 accent-primary" /> Express — by {deliveryDateFrom(1)}</span>
                <span className="text-ink-muted">{formatINR(299)}</span>
              </label>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-hairline bg-card p-5 shadow-card sm:p-6">
            <h3 className="mb-3 font-display text-sm font-bold text-ink">Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors ${payment === m.id ? 'border-primary bg-primary/5' : 'border-hairline'}`}>
                  <input type="radio" checked={payment === m.id} onChange={() => setPayment(m.id)} className="h-4 w-4 accent-primary" />
                  <m.icon size={16} className="text-primary" /> <span className="text-ink">{m.label}</span>
                </label>
              ))}
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
              <input type="checkbox" checked={simulateFail} onChange={(e) => setSimulateFail(e.target.checked)} className="h-4 w-4 accent-primary" />
              Demo: simulate a failed payment
            </label>
          </section>
        </div>

        {/* Summary */}
        <div className="h-fit space-y-4 rounded-2xl border border-hairline bg-card p-5 shadow-card lg:sticky lg:top-24">
          <h3 className="font-display text-sm font-bold text-ink">Order Summary</h3>
          <div className="max-h-56 space-y-3 overflow-y-auto scrollbar-thin pr-1">
            {activeItems.map((item) => {
              const p = find(item.productId);
              if (!p) return null;
              return (
                <div key={item.productId} className="flex gap-3 text-sm">
                  <img src={p.images[0]} alt="" className="h-12 w-12 rounded-lg bg-canvas-secondary object-cover" />
                  <div className="flex-1">
                    <div className="line-clamp-1 text-ink">{p.name}</div>
                    <div className="text-xs text-ink-muted">Qty {item.qty}</div>
                  </div>
                  <div className="text-sm font-semibold text-ink">{formatINR(p.price * item.qty)}</div>
                </div>
              );
            })}
          </div>
          <div className="space-y-2 border-t border-hairline pt-3 text-sm text-ink-muted">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            {couponCode && (
              <div className="flex justify-between text-success"><span>Coupon ({couponCode})</span><span>- {formatINR(couponDiscount)}</span></div>
            )}
            <div className="flex justify-between"><span>GST (18%)</span><span>{formatINR(gstAmount)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shippingAmount === 0 ? 'Free' : formatINR(shippingAmount)}</span></div>
            <div className="flex justify-between border-t border-hairline pt-2 font-display text-base font-extrabold text-ink"><span>Total</span><span>{formatINR(finalTotal)}</span></div>
          </div>
          <button
            onClick={confirmOrder}
            disabled={placing || !selectedAddr}
            className="hidden w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white shadow-pill transition-colors hover:bg-primary-hover disabled:opacity-50 lg:flex"
          >
            {placing ? <><Loader2 size={16} className="animate-spin" /> Processing Payment…</> : `Pay ${formatINR(finalTotal)}`}
          </button>
        </div>
      </div>

      {/* Sticky mobile pay bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-canvas/95 p-4 backdrop-blur-md lg:hidden">
        <button
          onClick={confirmOrder}
          disabled={placing || !selectedAddr}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white shadow-pill disabled:opacity-50"
        >
          {placing ? <><Loader2 size={16} className="animate-spin" /> Processing Payment…</> : `Pay ${formatINR(finalTotal)}`}
        </button>
      </div>
    </div>
  );
}
