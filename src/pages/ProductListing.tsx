import { useMemo, useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, PackageSearch, X, PackageX } from 'lucide-react';
import { useStore } from '../lib/store';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar, defaultFilters, type Filters } from '../components/FilterSidebar';
import { Breadcrumb, EmptyState, PageTitle, SkeletonGrid } from '../components/Common';
import { categories } from '../data/products';
import { discountPercent } from '../lib/format';

type Mode = 'all' | 'category' | 'search' | 'deals' | 'new-arrivals' | 'brands';

export function ProductListing({ mode }: { mode: Mode }) {
  const { products, addSearchHistory, searchHistory } = useStore();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular');
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const brandParam = searchParams.get('brand');
  const query = searchParams.get('q') || '';
  
  const rawCategoryId = params.categoryId || '';
  const categoryId = rawCategoryId.toLowerCase().replace(/\s*sarees?$/, '').replace(/\s*saree?$/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const isValidCategory = mode !== 'category' || categories.some(c => c.id === categoryId);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [mode, categoryId, query]);

  useEffect(() => {
    if (mode === 'search' && query) addSearchHistory(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, mode]);

  const filtered = useMemo(() => {
    if (mode === 'category' && !isValidCategory) return [];

    let list = [...products];
    if (mode === 'category' && categoryId) list = list.filter((p) => p.category?.toLowerCase() === categoryId);
    if (mode === 'deals') list = list.filter((p) => discountPercent(p.price || 0, p.mrp || 0) >= 8);
    if (mode === 'new-arrivals') list = list.filter((p) => p.badges?.includes('New') || true).slice().reverse();
    if (mode === 'search' && query) {
      const q = query.toLowerCase();
      list = list.filter((p) => [p.name, p.brand, p.fabric, p.category, p.occasion, p.weaveCraft].some((f) => f?.toLowerCase().includes(q)));
    }
    if (brandParam) list = list.filter((p) => p.brand === brandParam);

    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.size.length) list = list.filter((p) => filters.size.some((f) => p.size?.includes(f)));
    if (filters.color.length) list = list.filter((p) => filters.color.some((f) => p.color?.includes(f)));
    if (filters.fabric.length) list = list.filter((p) => filters.fabric.some((f) => p.fabric?.includes(f)));
    if (filters.occasion.length) list = list.filter((p) => filters.occasion.some((f) => p.occasion?.includes(f)));
    if (filters.craftWeave.length) list = list.filter((p) => filters.craftWeave.some((f) => p.weaveCraft?.includes(f)));

    list = list.filter((p) => (p.price || 0) <= filters.maxPrice);
    if (filters.minRating) list = list.filter((p) => (p.rating || 0) >= filters.minRating);
    if (filters.inStockOnly) list = list.filter((p) => (p.stock || 0) > 0);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-desc': list.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'latest': list.reverse(); break;
      case 'rating': list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'discount': list.sort((a, b) => discountPercent(b.price || 0, b.mrp || 0) - discountPercent(a.price || 0, a.mrp || 0)); break;
      default: list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }
    return list;
  }, [products, mode, categoryId, isValidCategory, query, brandParam, filters, sort]);

  const title =
    mode === 'category' ? categories.find((c) => c.id === categoryId)?.label ?? 'Category'
    : mode === 'search' ? `Saree Results for "${query}"`
    : mode === 'deals' ? 'Festive Saree Offers & Discounts'
    : mode === 'new-arrivals' ? 'New Saree Arrivals'
    : mode === 'brands' ? `${brandParam ?? 'All'} Saree Atelier`
    : 'All Women’s Sarees';

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: title }]} />
      <div className="mt-3 flex items-center justify-between gap-4">
        <PageTitle title={title} subtitle={`${filtered.length} authentic saree${filtered.length === 1 ? '' : 's'} available`} />
        <button onClick={() => setMobileFilters(true)} className="flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-card px-3.5 py-2.5 text-xs font-semibold text-ink shadow-sm sm:hidden">
          <SlidersHorizontal size={14} /> Saree Filters
        </button>
      </div>

      {mode === 'search' && searchHistory.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-ink-muted">Recent searches:</span>
          {searchHistory.map((h) => (
            <button key={h} onClick={() => setSearchParams({ q: h })} className="rounded-full border border-hairline bg-card px-2.5 py-1 text-ink transition-colors hover:border-primary hover:text-primary">{h}</button>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        <div className="hidden sm:block">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {mobileFilters && (
          <div className="fixed inset-0 z-50 flex sm:hidden">
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
            <div className="relative ml-auto h-full w-[85%] max-w-xs overflow-y-auto bg-canvas p-5 shadow-2xl animate-fade-in">
              <button onClick={() => setMobileFilters(false)} className="mb-4 flex items-center gap-1 text-sm font-semibold text-ink-muted"><X size={16} /> Close</button>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex justify-end">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-hairline bg-card px-4 py-2.5 text-xs font-medium text-ink shadow-sm outline-none focus:border-primary">
              <option value="popular">Sort: Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="latest">Newest Loom Arrivals</option>
              <option value="rating">Highest Patron Rating</option>
              <option value="discount">Festive Discount %</option>
            </select>
          </div>

          {loading ? (
            <SkeletonGrid />
          ) : !isValidCategory ? (
            <EmptyState icon={PackageX} title="Saree Category Not Found" body={`The category "${rawCategoryId}" does not exist in our atelier.`} />
          ) : filtered.length === 0 ? (
            mode === 'search' ? (
              <EmptyState icon={PackageSearch} title="No Sarees Found" body={`We couldn't find any sarees matching "${query}". Try searching for Kanjivaram, Banarasi, Cotton, or Organza.`} />
            ) : mode === 'category' ? (
              <EmptyState icon={PackageSearch} title="No Sarees in Category" body="Try adjusting or clearing your filters to explore more sarees." />
            ) : (
              <EmptyState icon={PackageSearch} title="No Sarees Match Filters" body="Try adjusting or clearing your filters to explore more sarees." />
            )
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
