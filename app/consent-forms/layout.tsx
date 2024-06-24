import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { Logo, ConsentFormIcon, UsersIcon } from '@/components/icons';
import { NavItem } from '../nav-item';
import { User } from '../../components/consent-form/create/user';

export const metadata = {
  title: 'iConsent Admin Dashboard',
  description: 'A user admin dashboard for managing informed consent forms.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-5">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Logo />
              <span>iConsent</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavItem href="/admin/users">
                <UsersIcon className="h-4 w-4" />
                Users
              </NavItem>
              <NavItem href="/admin/consent-forms">
                <ConsentFormIcon className="h-4 w-4" />
                Consent Forms
              </NavItem>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
          <Link className="flex items-center gap-2 font-semibold lg:hidden" href="/">
            <Logo />
            <span>iConsent</span>
          </Link>
          <User />
        </header>
        <main className="flex flex-col flex-1">
          {children}
        </main>
      </div>
      <Analytics />
    </div>
  );
}
