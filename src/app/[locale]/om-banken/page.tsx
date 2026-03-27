import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AboutPage() {
  const t = useTranslations('about');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-[#003087] mb-6">{t('title')}</h1>
        <div className="bg-white border border-[#d0d0d0] p-8 mb-6">
          <p className="text-sm text-[#333] leading-relaxed mb-4">{t('history')}</p>
          <p className="text-sm text-[#333] leading-relaxed">{t('values')}</p>
        </div>
        <div className="bg-white border border-[#d0d0d0] p-8">
          <h2 className="font-bold text-[#003087] mb-4">{t('communityTitle')}</h2>
          <p className="text-sm text-[#333] leading-relaxed">{t('communityText')}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
