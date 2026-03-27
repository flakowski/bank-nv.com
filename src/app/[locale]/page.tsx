import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#003087] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-blue-300 text-xs uppercase tracking-widest mb-2">{t('hero.welcome')}</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-blue-200 text-sm max-w-2xl leading-relaxed mb-6">{t('hero.message')}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#003087] font-bold text-xs">HB</div>
              <div>
                <p className="font-semibold text-sm">Hauk Bjerkedahl</p>
                <p className="text-blue-300 text-xs">{t('hero.position')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-[#003087] mb-6">{t('services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {['bank', 'funds', 'mortgage'].map((key) => (
              <div key={key} className="bg-white border border-[#d0d0d0] p-6 hover:border-[#003087] transition-colors">
                <h3 className="font-bold text-[#003087] mb-2">{t(`services.${key}`)}</h3>
                <p className="text-sm text-[#555]">{t(`services.${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="bg-[#e8eef7] py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-[#003087] mb-2">{t('community.title')}</h2>
            <p className="text-sm text-[#555] mb-6">{t('community.intro')}</p>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-white border border-[#d0d0d0] p-5">
                <h3 className="font-semibold text-sm mb-2">{t('community.football')}</h3>
                <p className="text-xs text-[#555]">{t('community.footballDesc')}</p>
              </div>
              <div className="bg-white border border-[#d0d0d0] p-5">
                <h3 className="font-semibold text-sm mb-2">{t('community.theater')}</h3>
                <p className="text-xs text-[#555]">{t('community.theaterDesc')}</p>
              </div>
              <div className="bg-white border border-[#d0d0d0] p-5">
                <h3 className="font-semibold text-sm mb-2">{t('community.youth')}</h3>
                <p className="text-xs text-[#555]">{t('community.youthDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intranet link */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white border border-[#d0d0d0] p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{t('intranet.title')}</p>
              <p className="text-xs text-[#555]">{t('intranet.subtitle')}</p>
            </div>
            <Link
              href="/login"
              className="bg-[#003087] text-white text-xs px-4 py-2 hover:bg-[#001f5a] transition-colors whitespace-nowrap"
            >
              {t('intranet.btn')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
