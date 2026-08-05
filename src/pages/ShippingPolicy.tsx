import { StaticPage } from '../components/StaticPage';

export function ShippingPolicy() {
  return (
    <StaticPage title="Shipping Policy" subtitle="Free delivery across India on orders above ₹50,000">
      <p>All orders are dispatched from our Bengaluru fulfilment centre within 48 hours of confirmation.</p>
      <h3>Delivery timelines</h3>
      <p>Standard delivery typically takes 3–6 business days depending on your pincode. Express delivery, where available, arrives within 24–48 hours for an additional fee shown at checkout.</p>
      <h3>Shipping charges</h3>
      <p>Standard shipping is free on orders above ₹50,000 and ₹499 below that threshold. Express delivery is charged at ₹299 regardless of order value.</p>
      <h3>Tracking</h3>
      <p>Once dispatched, you can track your order's live status from My Orders — from Packed through to Out for Delivery.</p>
      <h3>Serviceable areas</h3>
      <p>We currently deliver to over 19,000 pincodes across India. Use the delivery checker on any product page to confirm serviceability for your address.</p>
    </StaticPage>
  );
}
