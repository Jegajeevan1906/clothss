import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Trash2, BookmarkPlus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatINR } from '../lib/format';
import { EmptyState, PageTitle } from '../components/Common';

export function Cart() {
  const { cart, products, updateCartQty, removeFromCart, toggleSaveForLater, applyCoupon, clearCoupon, orderSummary } = useStore();
  const [couponInput, setCouponInput] = useState('');

  const activeItems = cart.filter((c) => !c.savedForLater);
  const savedItems = cart.filter((c) => c.savedForLater);
  const find = (id: string) => products.find((p) => p.id === id);

  const { subtotal, couponCode, couponDiscount, gstAmount, shippingAmount, finalTotal } = orderSummary;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState icon={ShoppingBag} title="Your cart is empty" body="Looks like you haven't added any clothing items yet. Explore our catalog to find your next outfit."
          action={<Link to="/products" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-pill">Continue Shopping</Link>} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-8">
      <PageTitle title="Shopping Cart" subtitle={`${activeItems.length} item${activeItems.length === 1 ? '' : 's'} in your cart`} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {activeItems.map((item) => {
            const p = find(item.productId);
            if (!p) return null;
            return (
              <div key={item.productId} className="flex gap-4 rounded-2xl border border-hairline bg-card p-4 shadow-card">
                <Link to={`/product/${p.slug}`} className="shrink-0"><img src={p.images[0]} alt={p.name} className="h-24 w-24 rounded-xl bg-canvas-secondary object-cover" /></Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to={`/product/${p.slug}`} className="font-display text-sm font-semibold text-ink hover:text-primary">{p.name}</Link>
                    <span className="shrink-0 font-display text-sm font-bold text-ink">{formatINR(p.price * item.qty)}</span>
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">Size: {item.size || p.size} · Color: {item.color || p.color} · Fabric: {p.fabric}</div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                    <div className="flex items-center gap-1 rounded-full border border-hairline">
                      <button aria-label="Decrease quantity" onClick={() => updateCartQty(item.productId, item.qty - 1)} className="rounded-full p-2 text-ink-muted hover:bg-canvas-secondary hover:text-ink"><Minus size={13} /></button>
                      <span className="w-5 text-center text-sm font-semibold text-ink">{item.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => updateCartQty(item.productId, item.qty + 1)} className="rounded-full p-2 text-ink-muted hover:bg-canvas-secondary hover:text-ink"><Plus size={13} /></button>
                    </div>
                    <div className="flex gap-3 text-xs font-medium text-ink-muted">
                      <button onClick={() => toggleSaveForLater(item.productId)} className="flex items-center gap-1 hover:text-primary"><BookmarkPlus size={13} /> Save for later</button>
                      <button onClick={() => removeFromCart(item.productId)} className="flex items-center gap-1 hover:text-discount"><Trash2 size={13} /> Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {savedItems.length > 0 && (
            <div className="pt-6">
              <h3 className="mb-3 font-display text-sm font-bold text-ink-muted">Saved for Later ({savedItems.length})</h3>
              <div className="space-y-3">
                {savedItems.map((item) => {
                  const p = find(item.productId);
                  if (!p) return null;
                  return (
                    <div key={item.productId} className="flex items-center gap-4 rounded-2xl border border-hairline bg-card p-4 opacity-80 shadow-card">
                      <img src={p.images[0]} alt={p.name} className="h-16 w-16 rounded-xl bg-canvas-secondary object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink">{p.name}</div>
                        <div className="text-xs text-ink-muted">{formatINR(p.price)}</div>
                      </div>
                      <button onClick={() => toggleSaveForLater(item.productId)} className="rounded-full border border-hairline px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary hover:text-primary">Move to Cart</button>
                      <button onClick={() => removeFromCart(item.productId)} className="text-ink-muted hover:text-discount"><Trash2 size={15} /></button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-hairline bg-card p-5 shadow-card lg:sticky lg:top-24">
          <div className="flex gap-2">
            <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code" className="flex-1 rounded-full border border-hairline bg-search px-4 py-2.5 text-sm outline-none focus:border-primary" />
            <button onClick={() => { applyCoupon(couponInput); setCouponInput(''); }} className="rounded-full bg-ink px-4 text-xs font-semibold text-white hover:bg-primary">Apply</button>
          </div>
          {couponCode && (
            <div className="flex items-center justify-between rounded-full bg-success/10 px-4 py-2 text-xs font-medium text-success">
              {couponCode} applied
              <button onClick={clearCoupon} className="underline">Remove</button>
            </div>
          )}

          <div className="space-y-2 border-t border-hairline pt-4 text-sm">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="GST (18%)" value={formatINR(gstAmount)} />
            <Row label="Shipping" value={shippingAmount === 0 ? 'Free' : formatINR(shippingAmount)} />
            {couponDiscount > 0 && <Row label="Coupon discount" value={`- ${formatINR(couponDiscount)}`} valueClass="text-success" />}
            <div className="flex justify-between border-t border-hairline pt-2 font-display text-base font-extrabold text-ink">
              <span>Total</span><span>{formatINR(finalTotal)}</span>
            </div>
          </div>

          <Link to="/checkout" className="hidden w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white shadow-pill transition-colors hover:bg-primary-hover lg:flex">
            Checkout <ArrowRight size={15} />
          </Link>
          <Link to="/products" className="hidden text-center text-xs font-medium text-ink-muted hover:text-primary lg:block">Continue Shopping</Link>
        </div>
      </div>

      {/* Sticky mobile checkout bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-canvas/95 p-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-ink-muted">Total</div>
            <div className="font-display text-lg font-extrabold text-ink">{formatINR(finalTotal)}</div>
          </div>
          <Link to="/checkout" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white shadow-pill">
            Checkout <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between text-ink-muted">
      <span>{label}</span><span className={valueClass ?? 'font-medium text-ink'}>{value}</span>
    </div>
  );
}
