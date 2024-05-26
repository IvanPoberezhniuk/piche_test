import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: {
    template: 'Wiki Events',
    default: 'Wiki Events',
  },
  description: 'Wiki Events Description',
};
