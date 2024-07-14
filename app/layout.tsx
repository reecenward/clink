import "./globals.css";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Clink',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
     
      <body className="no-scrollbar">
        {children}
      </body>
    </html>
  );
}