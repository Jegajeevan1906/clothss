import { Star } from 'lucide-react';

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= Math.round(rating);
        return (
          <Star
            key={i}
            size={size}
            className={filled ? 'fill-accent text-accent' : 'text-hairline'}
          />
        );
      })}
    </div>
  );
}

export function RatingBadge({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md bg-canvas-secondary px-2 py-0.5 text-xs">
      <span className="flex items-center gap-0.5 font-semibold text-accent">
        {rating.toFixed(1)} <Star size={11} className="fill-accent text-accent" />
      </span>
      {reviewCount !== undefined && <span className="text-ink-muted">({reviewCount})</span>}
    </div>
  );
}
