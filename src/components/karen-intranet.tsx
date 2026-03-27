'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

type Tab = 'inbox' | 'sent' | 'deleted' | 'news' | 'me' | 'documents';

const content = {
  no: {
    home: '← Hjem',
    tabs: { mail: 'E-post', news: 'Nyheter', me: 'Meg', documents: 'Dokumenter' },
    mailTabs: { inbox: 'Innboks', sent: 'Sendt', deleted: 'Slettet' },
    from: 'Fra:',
    to: 'Til:',
    cc: 'Kopi:',
    back: '← Tilbake',
    noNews: 'Ingen nyheter.',
    noMessages: 'Ingen meldinger.',
    noDocuments: 'Ingen dokumenter.',
    profile: 'Min profil',
    phishingWarning: '⚠ Advarsel: Denne e-posten kan være phishing. Del aldri kortinformasjon via e-post!',
    profileFields: [
      ['Navn', 'Karen Holm'],
      ['Stilling', 'Sekretær'],
      ['Telefon', '475 33 917'],
      ['Adresse', 'Daniel Andersens veg 14'],
      ['Postnr og by', '6970, Nedre Vesterdal'],
      ['Hovedkonto', '1550.33.72244'],
      ['Pårørende', 'Frode Holm, 460 17 032'],
    ],
    documentsTitle: 'Dokumenter',
    inbox: [
      {
        subject: 'Re: Pensjonering,,,',
        sender: 'Henrik Jensen (HR)',
        body: 'Kjære Karen.\n\nJeg forstår fullt ut ønsket ditt om å pensjonere deg etter hendelsen med Hauk, og så denne greia med diamanten etterpå. Takk for alle de fantastiske årene vi har jobbet sammen, og nyt pensjonen din i Spania med Frode!',
        read: true,
      },
    ],
    sent: [],
    deleted: [
      {
        subject: 'Kan du hjelpe oss å komme i kontakt med banksjefen?',
        sender: 'Velvet Narrows Local Bank',
        body: 'Hei, er du ikke sekretæren til Hauk Bjerkedahl? Vi har prøvd å invitere ham til en workshop, men vi har aldri fått svar. Kan du hjelpe oss å komme i kontakt med ham? Kanskje du kan sette opp et møte?',
        read: true,
      },
      {
        subject: 'Betalingsbekreftelse',
        sender: 'NVI Kundeservice',
        body: 'Hei. Vi bekrefter at vi har mottatt din betaling.',
        read: true,
      },
      {
        subject: 'Hvor er opptaket med NATTVISJON???',
        recipient: 'Nedre Vesterdal Cyber Security',
        cc: 'Karen Holm',
        body: 'Hallo!\n\nDere klarte bare å sende CCTV-opptaket fra hvelvet der alt er mørkt. Send den riktige filen med nattvisjon aktivert ASAP!!!!',
        read: true,
      },
      {
        subject: 'Fiks lysene på kontoret mitt',
        recipient: 'Finn S. Krüver',
        cc: 'Karen Holm',
        body: 'Hei, Finn, jeg sitter og skriver dette i mørket. Kan du ta deg sammen og fikse de forbannede lysene mine???',
        read: true,
      },
      {
        subject: 'En pakke under transport venter på din handling',
        sender: 'transit@thetotallyrealpostservice.co.info',
        body: 'Hei, en pakke under transport venter på din handling. For å fullføre transporten av pakken din, trenger vi en liten betaling på 60 kr for forsendelsen, ellers vil pakken bli returnert til avsender. Vennligst send oss ditt VISA-kortnummer, utløpsdato og CVC-koden på baksiden av kortet for å bekrefte betalingen.',
        read: false,
        isPhishing: true,
      },
    ],
  },
  en: {
    home: '← Home',
    tabs: { mail: 'Mail', news: 'News', me: 'Me', documents: 'Documents' },
    mailTabs: { inbox: 'Inbox', sent: 'Sent', deleted: 'Deleted' },
    from: 'From:',
    to: 'To:',
    cc: 'CC:',
    back: '← Back',
    noNews: 'No news.',
    noMessages: 'No messages.',
    noDocuments: 'No documents.',
    profile: 'My profile',
    phishingWarning: '⚠ Warning: This email may be phishing. Never share card information by email!',
    profileFields: [
      ['Name', 'Karen Holm'],
      ['Position', 'Secretary'],
      ['Phone', '475 33 917'],
      ['Address', 'Daniel Andersens veg 14'],
      ['Zip and city', '6970, Northern View'],
      ['Main account', '1550.33.72244'],
      ['Next of kin', 'Frode Holm, 460 17 032'],
    ],
    documentsTitle: 'Documents',
    inbox: [
      {
        subject: 'Re:Going to retire,,,',
        sender: 'Henrik Jensen (HR)',
        body: 'Dear, Karen.\n\nI understand completely your desire to retire after the incident with Hauk, and then this thing with the diamond afterward. Thank you for all the wonderful years we\'ve worked together, and enjoy your retirement in Spain with Frode!',
        read: true,
      },
    ],
    sent: [],
    deleted: [
      {
        subject: 'Could you help us get in touch with the bank manager?',
        sender: 'Velvet Narrows Local Bank',
        body: "Hi, aren't you the secretary of Hauk Bjerkedahl? We've been trying to invite him to a workshop, but we've never gotten an answer. Can you help us get in touch with him? Maybe you can set up a meeting?",
        read: true,
      },
      {
        subject: 'Payment Confirmation',
        sender: 'NVI Customer Service',
        body: "Hi. We're confirming that we've received your payment.",
        read: true,
      },
      {
        subject: 'Where is the footage with NIGHT VISION???',
        recipient: 'Northern View Cyber Security',
        cc: 'Karen Holm',
        body: 'Hello!\n\nYou only managed to send the CCTV from the vault where everything is dark. Send the correct file with night vision activated ASAP!!!!',
        read: true,
      },
      {
        subject: 'Fix the lights in my office',
        recipient: 'Finn S. Krüver',
        cc: 'Karen Holm',
        body: "Hi, Finn, I'm writing this whilst sitting in the dark. Can you get your act together and fix my damn lights???",
        read: true,
      },
      {
        subject: 'A package in transit is awaiting your action',
        sender: 'transit@thetotallyrealpostservice.co.info',
        body: 'Hi, a package in transit is awaiting your action. In order to finalize the transportation of your package, we need a small payment of 60 kr for the shipment, or the package will be returned to the sender. Please send us your VISA card number, expiration date and the CVC-code on the back of your card in order to confirm your payment.',
        read: false,
        isPhishing: true,
      },
    ],
  },
};

type Email = { subject: string; body: string; read: boolean; isPhishing?: boolean } & (
  | { sender: string; recipient?: never; cc?: never }
  | { recipient: string; cc?: string; sender?: never }
);

export default function KarenIntranet() {
  const locale = useLocale();
  const t = locale === 'no' ? content.no : content.en;
  const [tab, setTab] = useState<Tab>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<{ list: Email[]; index: number } | null>(null);
  const [mailFolder, setMailFolder] = useState<'inbox' | 'sent' | 'deleted'>('inbox');

  const currentList: Email[] =
    mailFolder === 'inbox' ? t.inbox as Email[] :
    mailFolder === 'sent' ? t.sent as Email[] :
    t.deleted as Email[];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#003087] text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#003087] font-bold text-xs px-2 py-1 rounded">NVB</div>
            <span className="font-semibold text-sm">NVB-Intranet</span>
          </div>
          <Link href="/" className="text-xs text-blue-200 hover:text-white">{t.home}</Link>
        </div>
        <nav className="bg-[#001f5a] border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 flex gap-1">
            {(['inbox', 'news', 'me', 'documents'] as Tab[]).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => { setTab(tabKey); setSelectedEmail(null); }}
                className={`px-4 py-2 text-xs transition-colors ${
                  (tabKey === 'inbox' && (tab === 'inbox' || tab === 'sent' || tab === 'deleted')) ||
                  tab === tabKey
                    ? 'bg-[#003087] text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {tabKey === 'inbox' ? t.tabs.mail : tabKey === 'news' ? t.tabs.news : tabKey === 'me' ? t.tabs.me : t.tabs.documents}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {(tab === 'inbox' || tab === 'sent' || tab === 'deleted') && (
          <div>
            {selectedEmail !== null ? (
              <div className="bg-white border border-[#d0d0d0] p-6">
                <button onClick={() => setSelectedEmail(null)} className="text-[#003087] text-xs mb-4 hover:underline">{t.back}</button>
                <h2 className="font-bold text-base mb-1">{selectedEmail.list[selectedEmail.index].subject}</h2>
                <p className="text-xs text-[#888] mb-1">
                  {(selectedEmail.list[selectedEmail.index] as Email).sender
                    ? `${t.from} ${(selectedEmail.list[selectedEmail.index] as {sender: string}).sender}`
                    : `${t.to} ${(selectedEmail.list[selectedEmail.index] as {recipient: string}).recipient}`}
                  {(selectedEmail.list[selectedEmail.index] as {cc?: string}).cc
                    ? ` — ${t.cc} ${(selectedEmail.list[selectedEmail.index] as {cc: string}).cc}`
                    : ''}
                </p>
                {selectedEmail.list[selectedEmail.index].isPhishing && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 mb-3 rounded">
                    {t.phishingWarning}
                  </div>
                )}
                <p className="text-sm text-[#333] leading-relaxed whitespace-pre-line mb-4">{selectedEmail.list[selectedEmail.index].body}</p>
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mb-4">
                  {(['inbox', 'sent', 'deleted'] as const).map((folder) => (
                    <button
                      key={folder}
                      onClick={() => { setMailFolder(folder); setSelectedEmail(null); }}
                      className={`text-xs pb-1 ${mailFolder === folder ? 'font-semibold text-[#003087] border-b-2 border-[#003087]' : 'text-[#888] hover:text-[#003087]'}`}
                    >
                      {folder === 'inbox' ? t.mailTabs.inbox : folder === 'sent' ? t.mailTabs.sent : t.mailTabs.deleted}
                    </button>
                  ))}
                </div>
                <div className="bg-white border border-[#d0d0d0]">
                  {currentList.length === 0 ? (
                    <p className="text-sm text-[#888] italic p-4">{t.noMessages}</p>
                  ) : (
                    currentList.map((email, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedEmail({ list: currentList, index: i })}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-[#d0d0d0] last:border-0 cursor-pointer hover:bg-[#f0f4fc] ${!email.read ? 'bg-[#f0f4fc]' : ''}`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!email.read ? 'bg-[#003087]' : 'bg-transparent'}`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${!email.read ? 'font-bold' : 'font-medium'}`}>{email.subject}</p>
                          <p className="text-xs text-[#888] truncate">
                            {email.sender ?? (email.recipient ? `${t.to} ${email.recipient}` : '')}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'news' && (
          <div className="bg-white border border-[#d0d0d0] p-6 text-sm text-[#888]">{t.noNews}</div>
        )}

        {tab === 'me' && (
          <div className="bg-white border border-[#d0d0d0] p-6 max-w-md">
            <h2 className="font-bold text-[#003087] mb-4">{t.profile}</h2>
            <table className="text-sm w-full">
              <tbody>
                {t.profileFields.map(([label, value]) => (
                  <tr key={label} className="border-b border-[#d0d0d0]">
                    <td className="py-2 text-[#888] pr-4 whitespace-nowrap">{label}</td>
                    <td className="py-2 font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'documents' && (
          <div className="bg-white border border-[#d0d0d0] p-6">
            <h2 className="font-bold text-[#003087] mb-4">{t.documentsTitle}</h2>
            <p className="text-sm text-[#888]">{t.noDocuments}</p>
          </div>
        )}
      </div>
    </div>
  );
}
