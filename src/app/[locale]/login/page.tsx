'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

type Tab = 'news' | 'me' | 'documents' | 'mail' | 'admin';

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('news');
  const locale = useLocale();
  const isNo = locale === 'no';

  const tabs = {
    news: isNo ? 'Nyheter' : 'News',
    me: isNo ? 'Meg' : 'Me',
    documents: isNo ? 'Dokumenter' : 'Documents',
    mail: isNo ? 'E-post' : 'Mail',
    admin: 'Admin',
  };

  const newsPosts = isNo
    ? [
        {
          date: '22.08.2021',
          title: 'OBS: Ny innloggingsmetode for intranett',
          author: 'Admin',
          body: `Hei, kjære kolleger!\n\nVi har endelig implementert den nye sikre innloggingen for intranett levert av NVC.\n\nFor å få tilgang til dine personlige profiler på intranett, har vi måttet sette opp en midlertidig løsning. Her er en enkel veiledning:\n\n1. Ha ansattnummeret ditt og de fem siste sifrene i personnummeret ditt klare.\n2. Skriv inn følgende i nettleserens URL:\n   bank-nv.com/${locale}/login[ansattnummer][personnummer]\n3. Skriv inn ditt personlige passord når du blir bedt om det.\n\nEksempel:\nOla Nordmann, ansattnummer 001, de fem siste sifrene i personnummeret er 12345\nPersonlig intranetadresse:\nbank-nv.com/${locale}/login00112345`,
          comments: [
            {
              author: 'Karen Holm',
              body: 'Å nei, disse fancy nye innloggingsgreiene er for kompliserte for meg,,, kan jeg bare bruke det samme passordet som alltid,,,,?',
            },
            {
              author: 'Hauk Bjerkedahl',
              body: 'Hei alle sammen ;) Husk at et sterkt passord inneholder spesialtegn, små og store bokstaver!',
            },
          ],
        },
        {
          date: '12.12.2020',
          title: 'Avskjedsgave til banksjefen',
          author: 'Karen Holm',
          body: 'Hei,,, Arnold sier farvel etter 28 år som banksjef her i banken,,,, det er en tung dag for mange av oss, og om dere alle vil, kan dere skrive på kortet som jeg har her på skrivebordet mitt, og kanskje bidra litt til avskjedsgaven hans,,??',
          comments: [],
        },
        {
          date: '01.07.2007',
          title: 'Ny design',
          author: 'Admin',
          body: 'Ja, nå er det endelig her, alle sammen. Omsider har vi modernisert designet på intranett. Dette designet er det ypperste av det ypperste, og vil forbli relevant og tidløst i tiår fremover!',
          comments: [],
        },
      ]
    : [
        {
          date: '22.08.2021',
          title: 'NOTE: New login method for the intranet',
          author: 'Admin',
          body: `Hey, dear colleagues!\n\nWe've finally implemented the new secure login for the intranet delivered by NVC.\n\nTo access your personal profiles on the intranet, we've had to set up a temporary solution. Here's a simple guide:\n\n1. Have your employee number and the last five digits of your social security number ready.\n2. Enter the following in your browser's URL:\n   bank-nv.com/${locale}/login[employee number][social security number]\n3. Enter your personal password when prompted.\n\nExample:\nJohn Doe, employee number 001, the last five digits in his social security number are 12345\nPersonal intranet address:\nbank-nv.com/${locale}/login00112345`,
          comments: [
            {
              author: 'Karen Holm',
              body: 'Oh dear, these fancy new log in thingamajigs are getting too complicated for me,,, can I just use the same pass word I always do,,,,?',
            },
            {
              author: 'Hauk Bjerkedahl',
              body: 'Hi everyone ;) Remember that a strong password includes special characters, lowercase and uppercase letters!',
            },
          ],
        },
        {
          date: '12.12.2020',
          title: 'Fare well gift for the bank chef',
          author: 'Karen Holm',
          body: "Hello,,, Arnold is saying good bye after 28 years as the bank chef here in the bank,,,, it's a heavy day for many of us, and if you all want to, you can write on the card that i have here at my desk, and maybe contribute a bit to his fare well gift,,??",
          comments: [],
        },
        {
          date: '01.07.2007',
          title: 'New design',
          author: 'Admin',
          body: "Well everyone, it's finally here. At long last, we've modernized the design of our intranet. This design is state of the art, and will remain relevant and timeless for decades to come!",
          comments: [],
        },
      ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#003087] text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#003087] font-bold text-xs px-2 py-1 rounded">NVB</div>
            <span className="font-semibold text-sm">NVB-Intranet</span>
          </div>
          <Link href="/" className="text-xs text-blue-200 hover:text-white">{isNo ? '← Hjem' : '← Home'}</Link>
        </div>
        <nav className="bg-[#001f5a] border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 flex gap-1">
            {(['news', 'me', 'documents', 'mail', 'admin'] as Tab[]).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 text-xs transition-colors ${tab === key ? 'bg-[#003087] text-white' : 'text-blue-200 hover:text-white'}`}
              >
                {tabs[key]}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'news' && (
          <div className="space-y-4">
            {newsPosts.map((post, i) => (
              <div key={i} className="bg-white border border-[#d0d0d0] p-6">
                <p className="text-xs text-[#888] mb-1">{post.date}</p>
                <h2 className="font-bold text-[#003087] text-base mb-1">{post.title}</h2>
                <p className="text-xs text-[#888] mb-3">{post.author}</p>
                <p className="text-sm text-[#333] whitespace-pre-line leading-relaxed">{post.body}</p>
                {post.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#e0e0e0] space-y-3">
                    {post.comments.map((c, j) => (
                      <div key={j} className="flex gap-2">
                        <span className="font-semibold text-xs text-[#003087] whitespace-nowrap">{c.author}:</span>
                        <span className="text-xs text-[#555]">{c.body}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab !== 'news' && (
          <div className="bg-white border border-[#d0d0d0] p-8 text-center">
            <p className="text-sm text-[#555] mb-3">
              {isNo
                ? 'Logg inn med din personlige intranetadresse for å få tilgang til denne seksjonen.'
                : 'Log in with your personal intranet address to access this section.'}
            </p>
            <p className="text-xs text-[#888] font-mono">
              bank-nv.com/{locale}/login[{isNo ? 'ansattnr.' : 'employee no.'}][{isNo ? 'siste 5 siffer i fnr.' : 'last 5 digits of SSN'}]
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
