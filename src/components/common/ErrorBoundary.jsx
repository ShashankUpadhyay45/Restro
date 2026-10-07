import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught exception]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl glass-card border border-rose-500/30">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="font-serif-brand font-bold text-2xl text-white mb-2">
              Something went awry
            </h2>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              An unexpected glitch occurred in the culinary rendering engine. Please reload the interface to restore experience.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90"
            >
              <RefreshCw className="w-4 h-4" /> Reload Platform
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
