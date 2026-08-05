import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 rounded-full bg-danger/10 p-5 text-danger">
            <AlertTriangle size={48} />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink">Something went wrong while loading this page.</h1>
          <p className="mt-3 max-w-md text-ink-muted">
            We encountered an unexpected error. Please try refreshing the page or navigating back to the home page.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Refresh Page
            </button>
            <Link
              to="/"
              className="rounded-full border border-hairline px-6 py-3 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
