import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations('contact');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-[#003087] mb-6">{t('title')}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#d0d0d0] p-6">
            <h2 className="font-bold text-[#003087] mb-4">{t('findUs')}</h2>
            <address className="not-italic text-sm text-[#333] space-y-1">
              <p className="font-semibold">{t('bankName')}</p>
              <p>Storgata 21</p>
              <p>{t('city')}</p>
              <p className="mt-3">{t('phone')}: 930 64 391</p>
              <p>{t('email')}: post@bank-nv.com</p>
            </address>
          </div>
          <div className="bg-white border border-[#d0d0d0] p-6">
            <h2 className="font-bold text-[#003087] mb-4">{t('hours')}</h2>
            <table className="text-sm w-full">
              <tbody>
                <tr className="border-b border-[#d0d0d0]">
                  <td className="py-2 text-[#555]">{t('monFri')}</td>
                  <td className="py-2 font-semibold">09:00 - 16:00</td>
                </tr>
                <tr className="border-b border-[#d0d0d0]">
                  <td className="py-2 text-[#555]">{t('saturday')}</td>
                  <td className="py-2 font-semibold">11:00 - 14:00</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#555]">{t('sunday')}</td>
                  <td className="py-2 font-semibold text-red-600">{t('closed')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
