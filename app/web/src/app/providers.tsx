"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        storageKey="gigjobs-theme"
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
