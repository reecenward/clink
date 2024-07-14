import { Toaster } from "@/components/ui/toaster"
export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

    return (
      <html lang="en">
        <body >
            {children}
            <Toaster />
        </body>
      </html>
    );
  }
  