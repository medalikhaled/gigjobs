import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { BackgroundGradientAnimation } from "~/components/animations/background-gradient-animation";
import { SparklesCore } from "~/components/animations/sparkles";
import { Meteors } from "~/components/animations/metors";
import SettingDrawer from "./(components)/setting-drawer";
import YourLocation from "./(components)/userLocation";

export default function HomePage() {
  return (
    <main
      className={`z-0 flex h-screen flex-col items-center bg-background text-foreground`}
    >
      {/* <HeaderSparkles /> */}
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <Meteors
          number={50}
          className="dark:bg-indigo-800-700 before:from-teal-400 dark:before:from-red-400"
        />

        <div className="container flex flex-col items-center justify-center gap-2 rounded-2xl md:w-2/3 md:flex-row md:gap-1">
          <div className="flex h-12 items-center justify-center gap-1 rounded-md border-0 border-foreground bg-transparent p-2 shadow-sm transition-colors md:w-1/3 md:rounded-l-3xl md:rounded-r-none md:border">
            {/* 
            opens up a drawer to set more parameter 
            if authed set them to the user, store them to local storage and suggest logging in
            */}
            <SettingDrawer />
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

        <YourLocation />
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
