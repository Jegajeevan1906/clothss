import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star, Quote, Award, Heart } from 'lucide-react';
import { useStore } from '../lib/store';
import { categories, brands } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/Common';
import { discountPercent, formatINR } from '../lib/format';

const testimonials = [
  { name: 'Priya Sundaram', role: 'Classic Saree Collector', quote: 'The Kanjivaram crimson silk saree I purchased for my daughter’s wedding was genuine Silk Mark certified with heavy gold korvai zari. Absolute perfection.' },
  { name: 'Meera Deshmukh', role: 'Cultural Heritage Stylist', quote: 'Swarna Sarees is a gem. The Banarasi Kadwa brocade and Jaipur Mulmul cottons are authentic handloom quality. The weave texture is unmatched.' },
  { name: 'Ananya Rao', role: 'Architect & Art Enthusiast', quote: 'Fast insured delivery, real fabric weight details, and beautiful gold packaging. My go-to saree atelier.' },
];

export function Home() {
  const { products } = useStore();
  const featured = products.slice(0, 4);
  const trending = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);
  const newArrivals = products.filter((p) => p.badges?.includes('New') || true).concat(products.slice(-2)).slice(0, 4);
  const bestSellers = products.filter((p) => p.badges?.includes('Bestseller') || true).slice(0, 4);
  const deals = products.filter((p) => discountPercent(p.price, p.mrp) > 0).sort((a, b) => discountPercent(b.price, b.mrp) - discountPercent(a.price, a.mrp)).slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-hairline bg-gradient-to-b from-canvas-secondary via-canvas to-canvas-secondary py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(122,12,30,0.12),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7 animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary shadow-sm">
              <Sparkles size={13} className="text-accent" /> FESTIVE &amp; BRIDAL ATELIER COLLECTION · 2026
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl">
              Handwoven Heritage &amp; Timeless Grace.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Step into an exquisite realm of 100% Silk Mark certified Kanjivarams, Banarasi Zari brocades, Jaipur Mulmul handlooms, and contemporary designer drapes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-primary-hover">
                Explore Saree Collection <ArrowRight size={16} />
              </Link>
              <Link to="/deals" className="flex items-center gap-2 rounded-full border border-hairline bg-card px-7 py-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary">
                Festive Spotlight Offers
              </Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-4 gap-4 border-t border-hairline pt-6 text-xs text-ink-muted">
              <div><div className="font-display text-2xl font-black text-primary">100%</div>Silk Mark</div>
              <div><div className="font-display text-2xl font-black text-primary">5.5m</div>Pure Drape</div>
              <div><div className="font-display text-2xl font-black text-primary">0.8m</div>Blouse Incl.</div>
              <div><div className="font-display text-2xl font-black text-primary">Pan-India</div>Insured Shipping</div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border-2 border-accent/40 bg-card shadow-card-hover">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1200&fit=crop&auto=format&q=80"
                alt="Royal Crimson Kanjivaram Pure Silk Saree"
                className="h-full w-full object-cover animate-fade-in"
              />
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold text-primary shadow-sm backdrop-blur">
                <Award size={14} className="text-accent" /> Heirloom Kanjivaram
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-hairline bg-card p-4 shadow-card-hover sm:block animate-scale-in">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Royal Crimson Gold Kanjivaram</div>
              <div className="font-display text-xl font-extrabold text-primary">{formatINR(18999)}</div>
              <div className="text-[10px] font-semibold text-emerald-700">Includes 0.8m Gold Zari Blouse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Saree Categories Showcase */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Curated Collections" title="Explore by Saree Fabric &amp; Weave" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-hairline bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-card-hover"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-canvas-secondary">
                <img
                  src={c.image}
                  alt={c.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-title text-xl font-bold text-ink group-hover:text-primary">{c.label}</h3>
                  <ArrowRight size={18} className="text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Sarees */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <SectionHeading eyebrow="Atelier Spotlight" title="Featured Saree Masterpieces" action={<Link to="/products" className="text-sm font-bold text-primary hover:underline">View All Sarees</Link>} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trending Weaves */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <SectionHeading eyebrow="Most Loved Drapes" title="Trending Saree Weaves" action={<Link to="/products?sort=popular" className="text-sm font-bold text-primary hover:underline">Explore Popular</Link>} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <SectionHeading eyebrow="Fresh Off The Loom" title="New Saree Arrivals" action={<Link to="/new-arrivals" className="text-sm font-bold text-primary hover:underline">View New Loom Drops</Link>} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <SectionHeading eyebrow="Iconic Classics" title="Best Selling Sarees" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Special Festive Offers */}
      <section className="border-y border-hairline bg-canvas-secondary py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Festive Celebrations" title="Special Saree Discounts &amp; Festive Offers" action={<Link to="/deals" className="text-sm font-bold text-primary hover:underline">View All Festive Deals</Link>} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Master Weavers & Brands */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Artisanal Looms" title="Master Weavers &amp; Heritage Ateliers" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-7">
          {brands.map((b) => (
            <Link key={b} to={`/products?brand=${encodeURIComponent(b)}`} className="flex flex-col items-center justify-center rounded-2xl border border-hairline bg-card p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:text-primary">
              <span className="font-serif-title text-sm font-bold text-ink">{b}</span>
              <span className="mt-1 text-[10px] font-semibold text-accent">Certified Weave</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guarantee & Trust Badges */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <TrustCard icon={Award} title="100% Silk Mark Authorized" body="Every pure silk saree comes with certified hologram silk mark authenticity." />
          <TrustCard icon={Truck} title="Free Insured Doorstep Delivery" body="Complimentary express transit insurance across all pincodes in India." />
          <TrustCard icon={ShieldCheck} title="Blouse Piece Guarantee" body="All sarees include 0.8m+ unstitched blouse piece with matching borders." />
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="border-t border-hairline bg-canvas-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionHeading eyebrow="Patron Reviews" title="What Saree Connoisseurs Say" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-hairline bg-card p-6 shadow-card">
                <Quote size={22} className="text-accent" />
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.quote}</p>
                <div className="mt-4 font-serif-title text-sm font-bold text-ink">{t.name}</div>
                <div className="text-xs text-primary font-medium">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustCard({ icon: Icon, title, body }: { icon: typeof ShieldCheck; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-hairline bg-card p-6 shadow-card">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={22} />
      </div>
      <div>
        <div className="font-serif-title text-base font-bold text-ink">{title}</div>
        <div className="mt-1 text-xs leading-relaxed text-ink-muted">{body}</div>
      </div>
    </div>
  );
}
