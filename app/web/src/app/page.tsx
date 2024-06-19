"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  FilePlusIcon,
  GearIcon,
  MoonIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { BackgroundGradientAnimation } from "~/components/animations/background-gradient-animation";
import { SparklesCore } from "~/components/animations/sparkles";

export default function HomePage() {
  const [dark, setDark] = useState<boolean>(true);
  const authed = false;

  return (
    <main
      className={`${dark && "dark"} flex min-h-screen flex-col items-center bg-background text-foreground`}
    >
      <nav className="z-50 flex w-full items-center justify-between px-8 py-4 md:px-20">
        <Button variant="default" onClick={() => null}>
          Open sidebar
        </Button>

        <div className="flex items-center justify-center gap-2">
          {authed ? (
            <Link href="/login">Login</Link>
          ) : (
            <Link href="/login" className="h-6 w-6">
              <PersonIcon className="h-6 w-6" />
            </Link>
          )}

          <Button variant="default" onClick={() => setDark((prev) => !prev)}>
            <MoonIcon className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* <HeaderSparkles /> */}

      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 rounded-2xl md:w-2/3 md:flex-row md:gap-1">
          <div className="flex h-12 items-center justify-center gap-1 rounded-md border-0 border-foreground bg-transparent p-2 shadow-sm transition-colors md:w-1/3 md:rounded-l-3xl md:rounded-r-none md:border">
            <Button variant="link" size="sm" className="">
              {/*
            opens up a drawer to set more parameter 
            if authed set them to the user, store them to local storage and suggest logging in
            */}
              <GearIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent md:bg-indigo-400 md:dark:bg-indigo-600"
            >
              <p className="hidden text-foreground md:inline-block">
                Upload CV
              </p>
              <FilePlusIcon className="h-5 w-5 text-foreground md:ml-2" />
            </Button>
          </div>
          <Input
            type="text"
            placeholder="E.g: Senior DevOps Engineer"
            className="h-12 rounded-md border-foreground py-4 text-base font-normal transition-colors focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus:dark:border-indigo-400 focus:dark:ring-indigo-400 md:rounded-l-none md:rounded-r-3xl"
          />
        </div>

        <div className="flex w-2/3 items-center justify-center gap-2 py-4">
          <MapPinIcon className="hidden size-4 text-indigo-400" />

          <p className="text-center text-sm italic text-slate-600 dark:text-slate-400 md:w-[70ch]">
            Location set to{" "}
            <span className="text-indigo-400">Sfax, Tunisia</span>. To change,
            use the{" "}
            <span className="text-indigo-400 dark:text-indigo-600">
              gear icon
            </span>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export function HeaderSparkles() {
  return (
    <div className="flex h-[24rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
      <h1 className="relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-9xl">
        GiG Jobs
      </h1>
      <div className="relative h-40 w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
