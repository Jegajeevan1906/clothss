import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Breadcrumb, PageTitle } from '../components/Common';
import { useStore } from '../lib/store';

export function Contact() {
  const { pushToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    pushToast("Message sent — we'll respond within 24 hours", 'success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <PageTitle title="Contact Us" subtitle="Questions about an order, a product, or a bulk purchase? We're here to help." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-line bg-graphite-800 p-6">
          <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input w-full" />
          <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input w-full" />
          <textarea required placeholder="How can we help?" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input w-full resize-none" />
          <button type="submit" className="rounded-lg bg-copper-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Send Message</button>
        </form>
        <div className="space-y-4">
          <InfoRow icon={Mail} title="Email" body="support@kinetic.in" />
          <InfoRow icon={Phone} title="Phone" body="1800-208-4455 (Toll-free, 9am–9pm IST)" />
          <InfoRow icon={MapPin} title="Head Office" body="4th Floor, Prestige Tech Park, Bengaluru, Karnataka 560103" />
          <InfoRow icon={MessageCircle} title="Live Chat" body="Available on this site 9am–11pm IST, every day" />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, title, body }: { icon: typeof Mail; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-line bg-graphite-800 p-4">
      <Icon size={18} className="mt-0.5 text-copper-500" />
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted">{body}</div>
      </div>
    </div>
  );
}
