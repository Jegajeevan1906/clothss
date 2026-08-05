import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <Compass size={40} className="text-copper-500" />
      <h1 className="mt-5 font-display text-3xl font-bold">404</h1>
      <p className="mt-2 text-sm text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-6 rounded-full bg-copper-500 px-6 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Back to Home</Link>
    </div>
  );
}
