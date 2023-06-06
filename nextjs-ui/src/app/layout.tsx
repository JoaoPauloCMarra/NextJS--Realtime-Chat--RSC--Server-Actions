import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import './globals.css';

const lato = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '700'],
});

export const metadata = {
  title: 'Realtime Chat w/ Graphql',
  description: 'A nextjs UI with Graphql Server for a realtime chat',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={lato.className}>{children}</body>
  </html>
);

export default RootLayout;
