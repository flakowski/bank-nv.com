'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';

type Tab = 'inbox' | 'sent' | 'deleted' | 'me' | 'documents';

const inbox = [
  {
    subject: 'Confirmation of the suggested meeting time',
    sender: 'Karl Storgård (NVC)',
    body: 'Hi, apologies for the delay, I am available at the time you suggested. Looking forward to the meeting!',
    read: true,
  },
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
    body: 'Hi, boss. I just wanted to give you a brief update about the stuff you had me look into regarding the new taxation rules. Do you have time for a meeting sometime soon?',
    read: true,
  },
  {
    subject: 'Invitation: Workshop on Sustainable Investing',
    sender: 'Velvet Narrows Local Bank',
    body: 'Hello. We would like to invite you to a workshop on sustainable investing. This will be a great opportunity to learn more about how we can invest responsibly for the future.',
    read: true,
  },
];

const documents = [
  { name: 'Payslip - Karen Holm.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
  { name: 'Payslip - Finn Krüver.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
  { name: 'Payslip - Hauk Bjerkedahl.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
  { name: 'Payslip - Jonathan Solheim.pdf', file: 'Lønseddel - Jonatan Solhjem.pdf' },
  { name: 'Payslip - Eva Hetman.pdf', file: 'Løneseddel - Finn Krüver.pdf' },
];

export default function HaukIntranet() {
  const [tab, setTab] = useState<Tab>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Intranet header */}
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
                <button onClick={() => setSelectedEmail(null)} className="text-[#003087] text-xs mb-4 hover:underline">← Tilbake til innboks</button>
                <h2 className="font-bold text-base mb-1">{inbox[selectedEmail].subject}</h2>
                <p className="text-xs text-[#888] mb-4">Fra: {inbox[selectedEmail].sender}</p>
                <p className="text-sm text-[#333] leading-relaxed whitespace-pre-line">{inbox[selectedEmail].body}</p>
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mb-4">
                  <button onClick={() => setTab('inbox')} className="text-xs font-semibold text-[#003087] border-b-2 border-[#003087] pb-1">Inbox</button>
                  <button onClick={() => setTab('sent')} className="text-xs text-[#888] hover:text-[#003087]">Sent</button>
                  <button onClick={() => setTab('deleted')} className="text-xs text-[#888] hover:text-[#003087]">Deleted</button>
                </div>
                <div className="bg-white border border-[#d0d0d0]">
                  {inbox.map((email, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedEmail(i)}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-[#d0d0d0] last:border-0 cursor-pointer hover:bg-[#f0f4fc] ${!email.read ? 'bg-[#f0f4fc]' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!email.read ? 'bg-[#003087]' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm truncate ${!email.read ? 'font-bold' : 'font-medium'}`}>{email.subject}</p>
                        </div>
                        <p className="text-xs text-[#888] truncate">{email.sender}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'sent' && (
          <div className="bg-white border border-[#d0d0d0] p-6 text-sm text-[#888]">Ingen sendte meldinger.</div>
        )}

        {tab === 'deleted' && (
          <div>
            <div className="flex gap-4 mb-4">
              <button onClick={() => setTab('inbox')} className="text-xs text-[#888] hover:text-[#003087]">Inbox</button>
              <button onClick={() => setTab('sent')} className="text-xs text-[#888] hover:text-[#003087]">Sent</button>
              <button className="text-xs font-semibold text-[#003087] border-b-2 border-[#003087] pb-1">Deleted</button>
            </div>
            <p className="text-sm text-[#888] italic">Ingen slettede meldinger.</p>
          </div>
        )}

        {tab === 'me' && (
          <div className="bg-white border border-[#d0d0d0] p-6 max-w-md">
            <h2 className="font-bold text-[#003087] mb-4">Min profil</h2>
            <table className="text-sm w-full">
              <tbody>
                {[
                  ['Navn', 'Hauk Bjerkedahl'],
                  ['Stilling', 'Bank Manager'],
                  ['Telefon', '986 75 208'],
                  ['Adresse', 'Paradisveien 4'],
                  ['Postnr og by', '6970, Northern View'],
                  ['Hovedkonto', '1550.33.69805'],
                  ['Pårørende', '—'],
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
