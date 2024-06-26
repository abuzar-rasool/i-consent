import ReactQueryProvider from '@/lib/react-query';
import './globals.css';
import { getSession } from "next-auth/react"


export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
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
        {children}
      </body>
    </html>
    </ReactQueryProvider>
  );
}
