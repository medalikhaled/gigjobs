"use client";
import { HomeIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "./toggle";
import { Sidebar } from "./sidebar";

export default function Navigation() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <>
      <Sidebar open={sidebarOpen} onOpenChange={handleSidebarToggle} />
      <nav className="fixed left-0 top-0 z-[99] flex w-full items-center justify-between bg-background/80 px-8 py-4 backdrop-blur-sm md:px-20">
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" onClick={() => handleSidebarToggle(true)}>
          <ListBulletIcon className="h-6 w-6 transition-colors hover:text-indigo-400" />
          <span className="sr-only">Open Sidebar</span>
        </Button>

        <Link href="/" className="h-6 w-6">
          <HomeIcon className="h-6 w-6 transition-colors hover:text-indigo-400" />
          <span className="sr-only">Go to Homepage</span>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2">
        {session ? (
          <Button
            variant="ghost"
            onClick={() => signOut()}
            className="rounded-md py-1 text-foreground transition-colors hover:text-red-500 md:px-4"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => signIn()}
            className="rounded-md py-1 text-foreground hover:bg-accent md:px-4"
          >
            Sign In
          </Button>
        )}

        <ModeToggle />
      </div>
    </nav>
    </>
  );
}
