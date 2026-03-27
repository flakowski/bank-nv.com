import PasswordGate from '@/components/password-gate';
import KarenIntranet from '@/components/karen-intranet';

export default function KarenLoginPage() {
  return (
    <PasswordGate correctPassword="bank!1234" storageKey="nvb_karen_auth">
      <KarenIntranet />
    </PasswordGate>
  );
}
