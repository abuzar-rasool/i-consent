import ReactQueryProvider from '@/lib/react-query';
import './globals.css';
import { SessionProvider } from "next-auth/react"


export const metadata = {
  title: 'iConsent Admin Dashboard',
  description:
    'iConsent Admin Dashboard is a simple, easy-to-use dashboard for managing your iConsent account.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <SessionProvider>
        {children}
        </SessionProvider>
      </body>
    </html>
    </ReactQueryProvider>
  );
}
