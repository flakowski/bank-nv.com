'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';

type Tab = 'inbox' | 'sent' | 'deleted' | 'me' | 'documents';

const inbox = [
  {
    subject: 'Re:Going to retire,,,',
    sender: 'Henrik Jensen (HR)',
    body: 'Dear, Karen.\n\nI understand completely your desire to retire after the incident with Hauk, and then this thing with the diamond afterward. Thank you for all the wonderful years we\'ve worked together, and enjoy your retirement in Spain with Frode!',
    read: true,
  },
  {
    subject: 'Payment Confirmation',
    sender: 'NVI Customer Service',
    body: "Hi. We're confirming that we've received your payment.",
    read: true,
  },
];

const deleted = [
  {
    subject: 'Could you help us get in touch with the bank manager?',
    sender: 'Velvet Narrows Local Bank',
    body: "Hi, aren't you the secretary of Hauk Bjerkedahl? We've been trying to invite him to a workshop, but we've never gotten an answer. Can you help us get in touch with him? Maybe you can set up a meeting?",
    read: true,
  },
];

const sent = [
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
];

const documents = [
  { name: 'VILKÅR OG BETINGELSER FOR PREMIUM DIAMANTFORSIKRING.pdf' },
  { name: 'Assurance Diamant Premium.pdf' },
  { name: 'Løneseddel - Finn Krüver.pdf' },
];

export default function KarenIntranet() {
  const [tab, setTab] = useState<Tab>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [emailList, setEmailList] = useState<'inbox' | 'sent' | 'deleted'>('inbox');

  const currentList = emailList === 'inbox' ? inbox : emailList === 'sent' ? sent : deleted;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#003087] text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#003087] font-bold text-xs px-2 py-1 rounded">NVB</div>
            <span className="font-semibold text-sm">NVB-Intranet</span>
          </div>
          <Link href="/" className="text-xs text-blue-200 hover:text-white">← Hjem</Link>
        </div>
        <nav className="bg-[#001f5a] border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 flex gap-1">
            {(['inbox', 'me', 'documents'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setSelectedEmail(null); }}
                className={`px-4 py-2 text-xs transition-colors ${tab === t ? 'bg-[#003087] text-white' : 'text-blue-200 hover:text-white'}`}
              >
                {t === 'inbox' ? 'Mail' : t === 'me' ? 'Me' : 'Documents'}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'inbox' && (
          <div>
            {selectedEmail !== null ? (
              <div className="bg-white border border-[#d0d0d0] p-6">
                <button onClick={() => setSelectedEmail(null)} className="text-[#003087] text-xs mb-4 hover:underline">← Tilbake</button>
                <h2 className="font-bold text-base mb-1">{currentList[selectedEmail].subject}</h2>
                <p className="text-xs text-[#888] mb-1">
                  {'sender' in currentList[selectedEmail] ? `Fra: ${(currentList[selectedEmail] as {sender: string}).sender}` : ''}
                  {'recipient' in currentList[selectedEmail] ? `Til: ${(currentList[selectedEmail] as {recipient: string}).recipient}` : ''}
                  {'cc' in currentList[selectedEmail] ? ` — Kopi: ${(currentList[selectedEmail] as {cc: string}).cc}` : ''}
                </p>
                {(currentList[selectedEmail] as {isPhishing?: boolean}).isPhishing && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 mb-3 rounded">
                    ⚠ Advarsel: Denne e-posten kan være phishing. Del aldri kortinformasjon via e-post!
                  </div>
                )}
                <p className="text-sm text-[#333] leading-relaxed whitespace-pre-line">{currentList[selectedEmail].body}</p>
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mb-4">
                  {(['inbox', 'sent', 'deleted'] as const).map((list) => (
                    <button
                      key={list}
                      onClick={() => { setEmailList(list); setSelectedEmail(null); }}
                      className={`text-xs pb-1 ${emailList === list ? 'font-semibold text-[#003087] border-b-2 border-[#003087]' : 'text-[#888] hover:text-[#003087]'}`}
                    >
                      {list === 'inbox' ? 'Inbox' : list === 'sent' ? 'Sent' : 'Deleted'}
                    </button>
                  ))}
                </div>
                <div className="bg-white border border-[#d0d0d0]">
                  {currentList.length === 0 && (
                    <p className="text-sm text-[#888] italic p-4">Ingen meldinger.</p>
                  )}
                  {currentList.map((email, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedEmail(i)}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-[#d0d0d0] last:border-0 cursor-pointer hover:bg-[#f0f4fc] ${!(email as {read: boolean}).read ? 'bg-[#f0f4fc]' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!(email as {read: boolean}).read ? 'bg-[#003087]' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${!(email as {read: boolean}).read ? 'font-bold' : 'font-medium'}`}>{email.subject}</p>
                        <p className="text-xs text-[#888] truncate">
                          {'sender' in email ? email.sender : ('recipient' in email ? `Til: ${(email as {recipient: string}).recipient}` : '')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'me' && (
          <div className="bg-white border border-[#d0d0d0] p-6 max-w-md">
            <h2 className="font-bold text-[#003087] mb-4">Min profil</h2>
            <table className="text-sm w-full">
              <tbody>
                {[
                  ['Navn', 'Karen Holm'],
                  ['Stilling', 'Secretary'],
                  ['Telefon', '475 33 917'],
                  ['Adresse', 'Daniel Andersens veg 14'],
                  ['Postnr og by', '6970, Northern View'],
                  ['Hovedkonto', '1550.33.72244'],
                  ['Pårørende', 'Frode Holm, 460 17 032'],
                ].map(([label, value]) => (
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
            <h2 className="font-bold text-[#003087] mb-4">Dokumenter</h2>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <a
                  key={i}
                  href={`/documents/${encodeURIComponent(doc.name)}`}
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
