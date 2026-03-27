'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/config';

const languageNames: Record<string, string> = {
  no: 'Norsk', en: 'English', sv: 'Svenska', da: 'Dansk',
  fi: 'Suomi', it: 'Italiano', fr: 'Français', et: 'Eesti',
};

export default function Header() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#003087] text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-white text-[#003087] font-bold text-xs px-2 py-1 rounded">NVB</div>
          <span className="font-semibold text-sm hidden sm:block">{tHero('title')}</span>
        </Link>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/" className="hover:text-blue-200 transition-colors">{t('home')}</Link>
          <Link href="/om-banken" className="hover:text-blue-200 transition-colors">{t('about')}</Link>
          <Link href="/kontakt" className="hover:text-blue-200 transition-colors">{t('contact')}</Link>
          <select
            value={locale}
            onChange={(e) => router.replace(pathname, { locale: e.target.value })}
            className="bg-transparent text-white text-xs border border-white/40 rounded px-2 py-1 cursor-pointer"
          >
            {locales.map((l) => (
              <option key={l} value={l} className="text-black">{languageNames[l]}</option>
            ))}
          </select>
        </nav>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#001f5a] px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">{t('home')}</Link>
          <Link href="/om-banken" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">{t('about')}</Link>
          <Link href="/kontakt" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">{t('contact')}</Link>
          <select
            value={locale}
            onChange={(e) => { router.replace(pathname, { locale: e.target.value }); setMenuOpen(false); }}
            className="bg-transparent text-white text-xs border border-white/40 rounded px-2 py-1 w-fit"
          >
            {locales.map((l) => (
              <option key={l} value={l} className="text-black">{languageNames[l]}</option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
}
