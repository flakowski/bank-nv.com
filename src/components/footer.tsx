'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tHero = useTranslations('hero');
  return (
    <footer className="bg-[#003087] text-white mt-12">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white text-[#003087] font-bold text-xs px-2 py-1 rounded">NVB</div>
              <span className="font-semibold text-sm">{tHero('title')}</span>
            </div>
            <p className="text-xs text-blue-200">{t('tagline')}</p>
          </div>
          <div className="text-sm">
            <Link href="/kontakt" className="text-blue-200 hover:text-white text-xs">{t('contact')}</Link>
            <br />
            <span className="text-blue-200 text-xs">post@bank-nv.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
