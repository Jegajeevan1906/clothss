import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { categories } from '../../data/products';
import type { Product } from '../../data/types';

const blank: Omit<Product, 'id' | 'slug' | 'reviews'> = {
  sku: '', brand: 'Swarna Heritage', name: '', category: 'silk', price: 0, mrp: 0, rating: 4.8, reviewCount: 0, stock: 10,
  images: [], shortDescription: '', description: '', 
  size: 'Free Size', color: '', fabric: 'Pure Silk', gender: 'Women', ageGroup: 'Adults', careInstructions: 'Dry clean only.',
  specialFeatures: ['100% Silk Mark Certified', 'Includes 0.8m Unstitched Blouse'], deliveryDays: 3, badges: ['New Arrival'],
};

export function AdminProductForm({ mode }: { mode: 'add' | 'edit' }) {
  const { products, addProduct, updateProduct, pushToast } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = mode === 'edit' ? products.find((p) => p.id === id) : undefined;

  const [form, setForm] = useState(existing ?? { id: '', slug: '', reviews: [], ...blank });
  const [imagesText, setImagesText] = useState(form.images.join('\n'));
  const [featuresText, setFeaturesText] = useState((form.specialFeatures || []).join(', '));

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleDiscountChange = (val: string) => {
    const discount = Number(val);
    if (isNaN(discount)) return;
    const newPrice = Math.round(form.mrp * (1 - discount / 100));
    setForm((f) => ({ ...f, price: newPrice }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      pushToast('Product name cannot be empty', 'error');
      return;
    }
    if (form.price <= 0 || form.mrp <= 0 || form.price > form.mrp) {
      pushToast('Invalid price. Ensure price > 0 and selling price <= MRP.', 'error');
      return;
    }
    if (form.stock < 0) {
      pushToast('Stock quantity cannot be negative', 'error');
      return;
    }
    
    const parsedImages = imagesText.split('\n').map(s => s.trim()).filter(Boolean);
    if (parsedImages.length === 0) {
      pushToast('At least one product image is required', 'error');
      return;
    }
    
    if (mode === 'add') {
      if (products.some((p) => p.sku === form.sku)) {
        pushToast('A product with this SKU already exists', 'error');
        return;
      }
    } else {
      if (products.some((p) => p.sku === form.sku && p.id !== existing?.id)) {
        pushToast('A product with this SKU already exists', 'error');
        return;
      }
    }

    try {
      const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const finalForm = {
        ...form,
        images: parsedImages,
        specialFeatures: featuresText.split(',').map(s => s.trim()).filter(Boolean),
      } as Product;

      if (mode === 'add') {
        addProduct({ ...finalForm, id: `s${Date.now()}`, slug, reviews: [] });
      } else {
        updateProduct(finalForm);
      }
      navigate('/admin/products');
    } catch (err) {
      pushToast('Failed to save product. Please check your data.', 'error');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">{mode === 'add' ? 'Add Saree Listing' : 'Edit Saree Listing'}</h1>
      <p className="mt-1 text-sm text-muted">{mode === 'add' ? 'Create a new Saree listing in the atelier catalog.' : `Editing ${existing?.name}`}</p>

      <form onSubmit={submit} className="mt-6 grid max-w-4xl grid-cols-1 gap-6 rounded-xl border border-line bg-graphite-800 p-6 sm:grid-cols-2">
        
        {/* Basic Info */}
        <div className="sm:col-span-2"><h3 className="font-semibold text-copper-500 border-b border-line pb-2">Basic Information</h3></div>
        <LabeledInput label="Weaver / Brand" value={form.brand} onChange={(v) => set('brand', v)} required />
        <LabeledInput label="Saree Name" value={form.name} onChange={(v) => set('name', v)} required />
        <LabeledInput label="SKU" value={form.sku} onChange={(v) => set('sku', v)} required />
        <div>
          <label className="mb-1 block text-xs text-muted">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value as Product['category'])} className="input w-full">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        {/* Pricing & Stock */}
        <div className="sm:col-span-2 mt-2"><h3 className="font-semibold text-copper-500 border-b border-line pb-2">Pricing & Inventory</h3></div>
        <LabeledInput label="MRP (₹) [Original Price]" type="number" value={String(form.mrp)} onChange={(v) => set('mrp', Number(v))} required />
        <LabeledInput label="Selling Price (₹)" type="number" value={String(form.price)} onChange={(v) => set('price', Number(v))} required />
        <LabeledInput label="Discount (%)" type="number" value={form.mrp > 0 ? String(Math.round(((form.mrp - form.price) / form.mrp) * 100)) : '0'} onChange={handleDiscountChange} />
        <LabeledInput label="Stock Quantity" type="number" value={String(form.stock)} onChange={(v) => set('stock', Number(v))} />
        <LabeledInput label="Delivery Days" type="number" value={String(form.deliveryDays)} onChange={(v) => set('deliveryDays', Number(v))} />
        <LabeledInput label="Rating (0-5)" type="number" value={String(form.rating)} onChange={(v) => set('rating', Number(v))} />
        <LabeledInput label="Review Count" type="number" value={String(form.reviewCount)} onChange={(v) => set('reviewCount', Number(v))} />

        {/* Specifications */}
        <div className="sm:col-span-2 mt-2"><h3 className="font-semibold text-copper-500 border-b border-line pb-2">Saree Details & Specifications</h3></div>
        <div>
          <label className="mb-1 block text-xs text-muted">Blouse & Size Option</label>
          <select value={form.size} onChange={(e) => set('size', e.target.value as any)} className="input w-full">
            {['Free Size', 'Unstitched Blouse', 'Stitched S', 'Stitched M', 'Stitched L', 'Stitched XL'].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <LabeledInput label="Colour & Palette" value={form.color} onChange={(v) => set('color', v)} required />
        <LabeledInput label="Fabric Purity" value={form.fabric} onChange={(v) => set('fabric', v)} required />
        <div>
          <label className="mb-1 block text-xs text-muted">Demographic Category</label>
          <select value={form.gender} onChange={(e) => set('gender', e.target.value as any)} className="input w-full">
            {['Women'].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <LabeledInput label="Age Group" value={form.ageGroup} onChange={(v) => set('ageGroup', v)} required />
        <LabeledInput label="Care Instructions (e.g. Dry Clean Only)" value={form.careInstructions || ''} onChange={(v) => set('careInstructions', v)} />

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted">Special Features / Badges (comma separated)</label>
          <input type="text" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} className="input w-full" />
        </div>

        {/* Media & Details */}
        <div className="sm:col-span-2 mt-2"><h3 className="font-semibold text-copper-500 border-b border-line pb-2">Media & Descriptions</h3></div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted">Product Images (one URL per line)</label>
          <textarea rows={4} value={imagesText} onChange={(e) => setImagesText(e.target.value)} className="input w-full resize-y" />
          <p className="text-[10px] text-muted mt-1">Strict Policy: Upload flat-lay, ghost mannequin, or clothing-only images (zero human faces allowed).</p>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted">Short Description</label>
          <textarea rows={2} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} className="input w-full resize-none" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted">Full Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} className="input w-full resize-y" />
        </div>

        <div className="mt-4 flex gap-3 sm:col-span-2">
          <button type="submit" className="rounded-lg bg-copper-500 px-6 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400 transition-colors">
            {mode === 'add' ? 'Add Product' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="rounded-lg border border-line px-6 py-2.5 text-sm hover:bg-white/5 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function LabeledInput({ label, value, onChange, type = 'text', required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="input w-full" />
    </div>
  );
}
