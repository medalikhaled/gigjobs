"use client";
import {
  HomeIcon,
  ListBulletIcon,
  PersonIcon,
  PinRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "./toggle";

export default function Navigation() {
  const authed = false;

  return (
    <nav className="absolute left-0 top-0 z-[99] flex w-full items-center justify-between bg-transparent px-8 py-4  md:px-20">
      <div className="flex items-center justify-center gap-2">
        <Button variant="link" onClick={() => null}>
          <ListBulletIcon className="h-6 w-6" />
        </Button>

        <Link href="/" className="h-6 w-6">
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2">
        {authed ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href="/login" className="h-6 w-6">
            <PersonIcon className="h-6 w-6" />
          </Link>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
}
