import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "~/components/theme-provider";
import Navigation from "./(components)/navigation";
import { Toaster } from "~/components/ui/sonner";

export const metadata = {
  title: "Gig Jobs",
  description: "where you go to find where your careers belongs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
        </ThemeProvider>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
