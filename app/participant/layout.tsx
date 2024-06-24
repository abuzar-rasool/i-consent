import '../globals.css';

import Link from 'next/link';
import { Logo } from '@/components/icons';

export const metadata = {
  title: 'iConsent Participant View',
  description:
    'Sign informed consent forms for research studies.'
};

export default function ParticipantViewLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between">
      <Link
        className="flex items-center gap-2 font-semibold"
        href="/"
      >
        <Logo />
        <span className="">iConsent</span>
      </Link>
    </header>
    <main className="flex flex-col flex-1 px-6 py-6">
      {children}
    </main>
  </div>
  );
}
