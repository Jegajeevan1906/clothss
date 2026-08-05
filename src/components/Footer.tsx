import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CreditCard, ArrowRight, Award } from 'lucide-react';
import { useStore } from '../lib/store';

export function Footer() {
  const { pushToast } = useStore();
  const [email, setEmail] = useState('');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    pushToast('Thank you for subscribing to Swarna Saree Atelier updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="border-t border-hairline bg-canvas-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:px-8">
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1">
          <div className="font-display text-xl font-black tracking-tight text-primary">
            SWARNA<span className="text-accent">.</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            India's premier atelier for handwoven Kanjivaram, Banarasi, Chanderi, Mulmul &amp; designer sarees. Handcrafted with purity and Silk Mark certified.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold">
            <Award size={15} /> 100% Silk Mark Authorized Weaves
          </div>
          <div className="mt-4 flex items-center gap-2 text-ink-muted">
            <CreditCard size={16} /><span className="text-xs">Visa · MasterCard · UPI · RuPay · No-Cost EMI</span>
          </div>
        </div>
        <FooterCol title="Collections" links={[
          ['All Sarees', '/products'], ['Silk Sarees', '/category/silk'], ['Cotton Sarees', '/category/cotton'], ['Traditional Weaves', '/category/traditional'], ['Designer & Everyday', '/category/designer'], ['Festive Offers', '/deals'],
        ]} />
        <FooterCol title="Support" links={[
          ['Contact Us', '/contact'], ['FAQ & Drapery Guide', '/faq'], ['Track Order', '/dashboard'], ['Return & Exchange', '/return-policy'], ['Insured Shipping', '/shipping-policy'],
        ]} />
        <FooterCol title="About Us" links={[
          ['Our Heritage', '/about'], ['Atelier Admin', '/admin'], ['Weaver Stories', '/about'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'],
        ]} />
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
          <h4 className="font-display text-sm font-bold text-ink">Privilege Club</h4>
          <p className="mt-3 text-sm text-ink-muted">Subscribe to receive early access to new weaver drops and festive preview invites.</p>
          <form onSubmit={subscribe} className="mt-3 flex items-center overflow-hidden rounded-full border border-hairline bg-card pl-4 shadow-sm focus-within:border-primary max-w-sm">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" required className="w-full min-w-0 bg-transparent py-2.5 text-xs text-ink outline-none placeholder:text-ink-muted" />
            <button aria-label="Subscribe" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover">
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-hairline px-6 py-5 text-center text-xs text-ink-muted lg:px-8">
        © 2026 Swarna Saree Atelier India Pvt Ltd. All rights reserved. CIN: U52100KA2024PTC000000
        <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1.5">
          <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          <Link to="/terms" className="hover:text-primary">Terms</Link>
          <Link to="/return-policy" className="hover:text-primary">Returns &amp; Exchanges</Link>
          <Link to="/shipping-policy" className="hover:text-primary">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold text-ink">{title}</h4>
      <ul className="mt-3 space-y-2.5 text-sm text-ink-muted">
        {links.map(([label, href]) => (
          <li key={label}><Link to={href} className="transition-colors hover:text-primary">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
