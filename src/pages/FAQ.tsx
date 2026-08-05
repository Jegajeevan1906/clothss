import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Breadcrumb, PageTitle } from '../components/Common';

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3–6 business days depending on your pincode. Express delivery (1–2 days) is available at checkout for most metro cities.' },
  { q: 'Do you offer a size guide?', a: 'Yes! Every product page includes the exact fit dimensions under the specifications. If you are between sizes, we recommend ordering one size up for a relaxed fit.' },
  { q: 'What is your Quality Guarantee?', a: 'All our products are crafted from premium fabrics, double-stitched for longevity, and subject to pre-dispatch quality checks to guarantee no defects or fabric runs.' },
  { q: 'Can I return or exchange an item if it does not fit?', a: 'Yes, unworn and unwashed clothing items with all original tags attached can be returned or exchanged within 7 days of delivery. See our Return Policy page for details.' },
  { q: 'Do you provide tax invoices?', a: 'Every order includes a compliant tax invoice, available for download from your dashboard once the order is shipped.' },
  { q: 'Is Cash on Delivery available?', a: 'COD is available on orders below ₹10,000 in serviceable pincodes. You can verify availability on any product page by entering your pincode.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      <PageTitle title="Frequently Asked Questions" />
      <div className="divide-y divide-line rounded-xl border border-line bg-graphite-800">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium">
              {f.q}
              <ChevronDown size={16} className={`shrink-0 text-muted transition-transform ${open === i ? 'rotate-180 text-copper-400' : ''}`} />
            </button>
            {open === i && <div className="px-5 pb-4 text-sm text-muted">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
