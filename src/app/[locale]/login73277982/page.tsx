import PasswordGate from '@/components/password-gate';
import HaukIntranet from '@/components/hauk-intranet';

export default function HaukLoginPage() {
  return (
    <PasswordGate correctPassword="!porsche_BOY78" storageKey="nvb_hauk_auth">
      <HaukIntranet />
    </PasswordGate>
  );
}
