import { brands, sizeFilters, colorFilters, fabricFilters, occasionFilters, craftWeaveFilters } from '../data/products';

export interface Filters {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  size: string[];
  color: string[];
  fabric: string[];
  occasion: string[];
  craftWeave: string[];
  minRating: number;
  inStockOnly: boolean;
}

export const defaultFilters: Filters = {
  brands: [], minPrice: 0, maxPrice: 50000, size: [], color: [], fabric: [], occasion: [], craftWeave: [], minRating: 0, inStockOnly: false,
};

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function FilterSidebar({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  return (
    <aside className="w-full shrink-0 space-y-7 rounded-[20px] border border-hairline bg-card p-5 sm:w-64">
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">Price up to</div>
        <input
          type="range" min={1000} max={50000} step={500}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="mt-1 text-xs font-bold text-primary">₹{filters.maxPrice.toLocaleString('en-IN')}</div>
      </div>

      <FilterGroup title="Occasion" options={occasionFilters} selected={filters.occasion} onChange={(v) => setFilters({ ...filters, occasion: toggle(filters.occasion, v) })} />
      <FilterGroup title="Fabric" options={fabricFilters} selected={filters.fabric} onChange={(v) => setFilters({ ...filters, fabric: toggle(filters.fabric, v) })} />
      <FilterGroup title="Weave & Craft" options={craftWeaveFilters} selected={filters.craftWeave} onChange={(v) => setFilters({ ...filters, craftWeave: toggle(filters.craftWeave, v) })} />
      <FilterGroup title="Weaver / Brand" options={brands} selected={filters.brands} onChange={(v) => setFilters({ ...filters, brands: toggle(filters.brands, v) })} />
      <FilterGroup title="Blouse & Size" options={sizeFilters} selected={filters.size} onChange={(v) => setFilters({ ...filters, size: toggle(filters.size, v) })} />
      <FilterGroup title="Palette & Color" options={colorFilters} selected={filters.color} onChange={(v) => setFilters({ ...filters, color: toggle(filters.color, v) })} />

      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">Rating</div>
        <div className="flex flex-wrap gap-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ...filters, minRating: filters.minRating === r ? 0 : r })}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filters.minRating === r ? 'border-primary bg-primary/10 text-primary' : 'border-hairline text-ink-muted hover:border-primary/40'}`}
            >
              {r}★ &amp; up
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink">
        <input type="checkbox" checked={filters.inStockOnly} onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })} className="h-4 w-4 accent-primary" />
        In stock only
      </label>

      <button onClick={() => setFilters(defaultFilters)} className="text-xs font-semibold text-primary hover:underline">
        Clear all filters
      </button>
    </aside>
  );
}

function FilterGroup({ title, options, selected, onChange }: { title: string; options: string[]; selected: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">{title}</div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-xs text-ink-muted transition-colors hover:text-ink cursor-pointer">
            <input type="checkbox" checked={selected.includes(o)} onChange={() => onChange(o)} className="h-3.5 w-3.5 accent-primary shrink-0" />
            <span className="line-clamp-1">{o}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
