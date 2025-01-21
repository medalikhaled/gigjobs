"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SparklesCore } from "~/components/animations/sparkles";
import { Meteors } from "~/components/animations/metors";
import SettingDrawer from "./(components)/setting-drawer";
import UploadCV from "./(components)/uploadCV";
import Footer from "./(components)/footer";
import { useLocationStore } from "~/stores/userData";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { MapPinIcon } from "@heroicons/react/20/solid";

export default function HomePage() {
  const { coordinates, keywords: storedKeywords } = useLocationStore();
  const [jobSearch, setJobSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!jobSearch) {
      return;
    }

    setIsSearching(true);
    try {
      // TODO: Implement job search API call
      console.log("Searching for jobs:", {
        position: jobSearch,
        location: coordinates?.displayName,
        keywords: storedKeywords,
      });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="z-0 flex min-h-screen flex-col items-center bg-background pt-20 text-foreground">
      <HeaderSparkles />
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <Meteors
          number={50}
          className="dark:bg-indigo-800-700 before:from-teal-400 dark:before:from-red-400"
        />

        <div className="container flex flex-col items-center justify-center gap-2 rounded-2xl md:w-2/3 md:flex-row md:gap-1">
          <div className="flex h-12 items-center justify-center gap-1 rounded-md border-0 border-foreground bg-transparent p-2 shadow-sm transition-colors md:w-1/3 md:rounded-l-3xl md:rounded-r-none md:border">
            <SettingDrawer />
            <UploadCV />
            {coordinates?.displayName && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPinIcon className="h-4 w-4" />
                <span className="line-clamp-1">{coordinates.displayName}</span>
              </div>
            )}
          </div>

          <div className="relative w-full md:w-2/3">
            <div className="relative">
              <Input
                type="text"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="E.g: Senior DevOps Engineer"
                className="h-12 rounded-md border-foreground py-4 pl-4 pr-12 text-base font-normal transition-colors focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus:dark:border-indigo-400 focus:dark:ring-indigo-400 md:rounded-l-none md:rounded-r-3xl"
                disabled={isSearching}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleSearch}
                disabled={isSearching}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </Button>
            </div>
            {storedKeywords && (
              <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
                Keywords: {storedKeywords}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </section>
    </main>
  );
}

export function HeaderSparkles() {
  return (
    <div className="relative hidden h-[16rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent md:flex">
      <h1 className="relative z-20 text-center text-3xl font-bold md:text-7xl lg:text-9xl">
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
