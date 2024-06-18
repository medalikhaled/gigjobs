"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FilePlusIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function HomePage() {
  const [dark, setDark] = useState<boolean>(true);
  const authed = false;

  return (
    <main
      className={`${dark && "dark"} flex min-h-screen flex-col items-center bg-background text-foreground`}
    >
      <nav className="flex w-full items-center justify-between px-8 py-4 md:px-20">
        <Button variant="default" onClick={() => setDark((prev) => !prev)}>
          Open sidebar
        </Button>
        <div>
          {authed ? (
            <Link href="/login">Login</Link>
          ) : (
            <Button variant="ghost" size="icon">
              <PersonIcon className="h-6 w-6" />
            </Button>
          )}
        </div>
      </nav>

      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 rounded-2xl md:w-2/3 md:flex-row md:gap-1">
          <div className="flex h-12 items-center justify-center gap-1 rounded-md border-0 border-input bg-transparent p-2 shadow-sm transition-colors dark:border-foreground md:w-1/3 md:rounded-l-3xl md:rounded-r-none md:border">
            <Button variant="link" size="sm" className="">
              {/*
            opens up a drawer to set more parameter 
            if authed set them to the user, store them to local storage and suggest logging in
            */}
              <GearIcon className="h-5 w-5 text-indigo-300" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-transparent md:dark:bg-indigo-600"
            >
              <p className="hidden md:inline-block">Upload CV</p>
              <FilePlusIcon className="h-5 w-5 md:ml-2" />
            </Button>
          </div>
          <Input
            type="text"
            placeholder="E.g: Senior DevOps Engineer"
            className="h-12 rounded-md border-foreground py-4 text-base font-normal transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus:dark:border-indigo-400 focus:dark:ring-indigo-400 md:rounded-l-none md:rounded-r-3xl"
          />
        </div>

        <div className="flex w-2/3 items-center justify-center gap-2 py-4">
          <MapPinIcon className="hidden size-4 text-indigo-400" />

          <p className="text-center text-sm italic text-slate-400 md:w-[70ch]">
            Location set to{" "}
            <span className="text-indigo-400">Sfax, Tunisia</span>. To change,
            use the <span className="text-indigo-300">gear icon</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
