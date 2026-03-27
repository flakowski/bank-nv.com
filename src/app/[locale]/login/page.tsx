export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-[#d0d0d0] shadow-sm p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-[#003087] text-white font-bold text-xs px-2 py-1 rounded">NVB</div>
          <span className="font-semibold text-sm">NVB-Intranet</span>
        </div>
        <h2 className="text-base font-semibold mb-4 text-[#003087]">Logg inn</h2>
        <p className="text-xs text-[#555] mb-4">
          For å logge inn på intranett, bruk din personlige intranet-adresse.
        </p>
        <p className="text-xs text-[#888] font-mono">
          bank-nv.com/login[ansattnr][siste 5 siffer i personnr]
        </p>
      </div>
    </div>
  );
}
