'use client';
import { useState, useEffect } from 'react';

interface PasswordGateProps {
  correctPassword: string;
  storageKey: string;
  children: React.ReactNode;
}

export default function PasswordGate({ correctPassword, storageKey, children }: PasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(storageKey);
      if (stored === 'true') setAuthenticated(true);
      setChecked(true);
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      sessionStorage.setItem(storageKey, 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };

  if (!checked) return null;
  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-[#d0d0d0] shadow-sm p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-[#003087] text-white font-bold text-xs px-2 py-1 rounded">NVB</div>
          <span className="font-semibold text-sm">NVB-Intranet</span>
        </div>
        <h2 className="text-base font-semibold mb-4 text-[#003087]">Logg inn</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#555] mb-1">Passord</label>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv inn passord"
              className="w-full border border-[#d0d0d0] px-3 py-2 text-sm focus:outline-none focus:border-[#003087]"
            />
          </div>
          {error && <p className="text-red-600 text-xs">Feil passord. Prøv igjen.</p>}
          <button
            type="submit"
            className="w-full bg-[#003087] text-white text-sm py-2 hover:bg-[#001f5a] transition-colors"
          >
            Logg inn
          </button>
        </form>
      </div>
    </div>
  );
}
