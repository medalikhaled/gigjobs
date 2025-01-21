import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Navigation from "./(components)/navigation";
import { Providers } from "./providers";

export const metadata = {
  title: "Gig Jobs",
  description: "Find your next career opportunity in the gig economy",
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
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
