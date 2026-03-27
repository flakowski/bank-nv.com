'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

type Tab = 'mail' | 'news' | 'me' | 'documents';
type MailFolder = 'inbox' | 'sent' | 'deleted';

type Email = {
  subject: string;
  body: string;
  read: boolean;
  attachment?: { name: string; path: string };
} & (
  | { sender: string; recipient?: never; cc?: never }
  | { recipient: string; cc?: string; sender?: never }
);

const content = {
  no: {
    home: '← Hjem',
    tabs: { mail: 'E-post', news: 'Nyheter', me: 'Meg', documents: 'Dokumenter' },
    mailTabs: { inbox: 'Innboks', sent: 'Sendt', deleted: 'Slettet' },
    from: 'Fra:',
    to: 'Til:',
    cc: '— Kopi:',
    back: '← Tilbake til innboks',
    noMessages: 'Ingen meldinger.',
    noNews: 'Ingen nyheter.',
    profile: 'Min profil',
    documentsTitle: 'Dokumenter',
    profileFields: [
      ['Navn', 'Hauk Bjerkedahl'],
      ['Stilling', 'Banksjef'],
      ['Telefon', '986 75 208'],
      ['Adresse', 'Paradisveien 4'],
      ['Postnr og by', '6970, Nedre Vesterdal'],
      ['Hovedkonto', '1550.33.69805'],
      ['Pårørende', '—'],
    ],
    inbox: [
      {
        subject: 'Bekreftelse på foreslått møtetid',
        sender: 'Karl Storgård (NVC)',
        body: 'Hei, beklager forsinkelsen, jeg er tilgjengelig på tidspunktet du foreslo. Ser frem til møtet!',
        read: true,
      },
    ] as Email[],
    sent: [
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
    ] as Email[],
    deleted: [
      {
        subject: 'Angående budsjettet for neste kvartal',
        sender: 'Anders Persson',
        body: 'Jeg har gått gjennom budsjettet for neste kvartal, og vi må gjøre noen justeringer. Kan vi finne tid til å diskutere dette i morgen?',
        read: false,
      },
      {
        subject: 'Viktig oppdatering angående din konto!',
        sender: 'Nedre Vesterdal Sparebank Kredittavdeling',
        body: 'Hei, Hauk.\n\nDette gjelder alle dine ubetalte kredittkortregninger. Selv om du er banksjef, vil vi måtte sende dem til inkasso, eller i verste fall trekke i lønn inntil gjelden er betalt, dersom du ikke begynner å betale snart. Neste forfall er 45.590 kr, og vi ber om at dette gjøres opp innen 01.06.2024 dersom vi skal unnlate å sende det til inkasso.',
        read: false,
      },
      {
        subject: 'Re: Det er på høy tid at vi får henne til å slutte!',
        sender: 'Henrik Jensen (HR)',
        body: 'Jeg er svært bekymret over den siste utviklingen. Det er på tide at vi tar noen konkrete grep for å løse situasjonen. Har du noen anelse om hvor uheldig det var at du ba henne slutte ansikt til ansikt? Kan vi diskutere dette i dag?',
        read: false,
      },
      {
        subject: 'Oppdatering angående skatteregler',
        sender: 'Samuel Borg',
        body: 'Hei, sjef. Jeg ville bare gi deg en kort oppdatering om det du ba meg undersøke angående de nye skattereglene. Har du tid til et møte snart?',
        read: true,
      },
      {
        subject: 'Invitasjon: Workshop om bærekraftig investering',
        sender: 'Velvet Narrows Local Bank',
        body: 'Hei. Vi ønsker å invitere deg til en workshop om bærekraftig investering. Dette vil være en flott mulighet til å lære mer om hvordan vi kan investere ansvarlig for fremtiden.',
        read: true,
      },
      {
        subject: 'Vi har mottatt betalingen din',
        sender: 'NVI Forsikring AS',
        body: 'Hei, vi har mottatt betalingen din. Her er forsikringsbeviset ditt.',
        read: false,
        attachment: {
          name: 'VILKÅR OG BETINGELSER FOR PREMIUM DIAMANTFORSIKRING.pdf',
          path: '/documents/VILK%C3%85R%20OG%20BETINGELSER%20FOR%20PREMIUM%20DIAMANTFORSIKRING.pdf',
        },
      },
    ] as Email[],
  },
  en: {
    home: '← Home',
    tabs: { mail: 'Mail', news: 'News', me: 'Me', documents: 'Documents' },
    mailTabs: { inbox: 'Inbox', sent: 'Sent', deleted: 'Deleted' },
    from: 'From:',
    to: 'To:',
    cc: '— CC:',
    back: '← Back to inbox',
    noMessages: 'No messages.',
    noNews: 'No news.',
    profile: 'My profile',
    documentsTitle: 'Documents',
    profileFields: [
      ['Name', 'Hauk Bjerkedahl'],
      ['Position', 'Bank Manager'],
      ['Phone', '986 75 208'],
      ['Address', 'Paradisveien 4'],
      ['Zip and city', '6970, Northern View'],
      ['Main account', '1550.33.69805'],
      ['Next of kin', '—'],
    ],
    inbox: [
      {
        subject: 'Confirmation of the suggested meeting time',
        sender: 'Karl Storgård (NVC)',
        body: 'Hi, apologies for the delay, I am available at the time you suggested. Looking forward to the meeting!',
        read: true,
      },
    ] as Email[],
    sent: [
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
    ] as Email[],
    deleted: [
      {
        subject: 'About the budget for the next quarter',
        sender: 'Anders Persson',
        body: "I've gone through the budget for the next quarter, and we have to make some adjustments. Could we find the time to discuss this tomorrow?",
        read: false,
      },
      {
        subject: 'Important update regarding your account!',
        sender: 'Northern View Savings Bank Credit Department',
        body: "Hi, Hauk.\n\nThis is regarding all your unpaid credit card bills. Even if you're the bank manager, we will have to send them to the debt collector's office, or at the very worst, do pay cuts until the debt is paid, if you do not start paying soon. Your next payment due is 45.590 kr, and we request it to be settled before 01.06.2024 if we are to refrain from sending it to collections.",
        read: false,
      },
      {
        subject: "Re: It's about bloody time we make her quit!",
        sender: 'Henrik Jensen (HR)',
        body: "I am truly concerned about the recent developments. It's time we take some concrete measures to resolve the situation. Do you have any idea how unfortunate it is that you told her to quit, face to face? Can we discuss this today?",
        read: false,
      },
      {
        subject: 'Update regarding taxation rules',
        sender: 'Samuel Borg',
        body: 'Hi, boss. I just wanted to give you a brief update about the stuff you had me look into regarding the new taxation rules. Do you have time for a meeting soon?',
        read: true,
      },
      {
        subject: 'Invitation: Workshop on Sustainable Investing',
        sender: 'Velvet Narrows Local Bank',
        body: 'Hello. We would like to invite you to a workshop on sustainable investing. This will be a great opportunity to learn more about how we can invest responsibly for the future.',
        read: true,
      },
      {
        subject: 'We have received your payment',
        sender: 'NVI Insurance',
        body: "Hi, we have received your payment. Here is your insurance certificate.",
        read: false,
        attachment: {
          name: 'VILKÅR OG BETINGELSER FOR PREMIUM DIAMANTFORSIKRING.pdf',
          path: '/documents/VILK%C3%85R%20OG%20BETINGELSER%20FOR%20PREMIUM%20DIAMANTFORSIKRING.pdf',
        },
      },
    ] as Email[],
  },
};

const documents = [
  { name: 'Payslip - Karen Holm.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
  { name: 'Payslip - Finn Krüver.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
  { name: 'Payslip - Hauk Bjerkedahl.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
  { name: 'Payslip - Jonathan Solheim.pdf', file: 'Lønseddel - Jonatan Solhjem.pdf' },
  { name: 'Payslip - Eva Hetman.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
];

export default function HaukIntranet() {
  const locale = useLocale();
  const t = locale === 'no' ? content.no : content.en;
  const [tab, setTab] = useState<Tab>('mail');
  const [folder, setFolder] = useState<MailFolder>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<{ list: Email[]; index: number } | null>(null);

  const currentList: Email[] =
    folder === 'inbox' ? t.inbox :
    folder === 'sent' ? t.sent :
    t.deleted;

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
            {(['mail', 'news', 'me', 'documents'] as Tab[]).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => { setTab(tabKey); setSelectedEmail(null); }}
                className={`px-4 py-2 text-xs transition-colors ${tab === tabKey ? 'bg-[#003087] text-white' : 'text-blue-200 hover:text-white'}`}
              >
                {tabKey === 'mail' ? t.tabs.mail : tabKey === 'news' ? t.tabs.news : tabKey === 'me' ? t.tabs.me : t.tabs.documents}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'mail' && (
          <div>
            {selectedEmail !== null ? (
              <div className="bg-white border border-[#d0d0d0] p-6">
                <button onClick={() => setSelectedEmail(null)} className="text-[#003087] text-xs mb-4 hover:underline">{t.back}</button>
                <h2 className="font-bold text-base mb-1">{selectedEmail.list[selectedEmail.index].subject}</h2>
                <p className="text-xs text-[#888] mb-4">
                  {selectedEmail.list[selectedEmail.index].sender
                    ? `${t.from} ${selectedEmail.list[selectedEmail.index].sender}`
                    : `${t.to} ${(selectedEmail.list[selectedEmail.index] as {recipient: string}).recipient}`}
                  {(selectedEmail.list[selectedEmail.index] as {cc?: string}).cc
                    ? ` ${t.cc} ${(selectedEmail.list[selectedEmail.index] as {cc: string}).cc}`
                    : ''}
                </p>
                <p className="text-sm text-[#333] leading-relaxed whitespace-pre-line mb-4">{selectedEmail.list[selectedEmail.index].body}</p>
                {selectedEmail.list[selectedEmail.index].attachment && (() => {
                  const att = selectedEmail.list[selectedEmail.index].attachment!;
                  return (
                    <a
                      href={att.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#d0d0d0] hover:border-[#003087] hover:bg-[#f0f4fc] transition-colors text-sm"
                    >
                      <span className="text-red-600">📄</span>
                      <span className="text-[#003087] hover:underline">{att.name}</span>
                    </a>
                  );
                })()}
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mb-4">
                  {(['inbox', 'sent', 'deleted'] as MailFolder[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => { setFolder(f); setSelectedEmail(null); }}
                      className={`text-xs pb-1 ${folder === f ? 'font-semibold text-[#003087] border-b-2 border-[#003087]' : 'text-[#888] hover:text-[#003087]'}`}
                    >
                      {f === 'inbox' ? t.mailTabs.inbox : f === 'sent' ? t.mailTabs.sent : t.mailTabs.deleted}
                    </button>
                  ))}
                </div>
                <div className="bg-white border border-[#d0d0d0]">
                  {currentList.length === 0 ? (
                    <p className="text-sm text-[#888] p-4">{t.noMessages}</p>
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
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <a
                  key={i}
                  href={`/documents/${encodeURIComponent(doc.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-[#d0d0d0] hover:border-[#003087] hover:bg-[#f0f4fc] transition-colors text-sm"
                >
                  <span className="text-red-600">📄</span>
                  <span className="text-[#003087] hover:underline">{doc.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
