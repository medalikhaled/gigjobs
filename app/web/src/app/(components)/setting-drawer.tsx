"use client";

import { GearIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { useLocationStore } from "~/stores/userData";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

export default function SettingDrawer() {
  const {
    keywords: storedKeywords,
    location: storedLocation,
    changeLocation,
    changeKeywords,
  } = useLocationStore();
  const [location, setLocation] = useState(storedLocation || "");
  const [keywords, setKeywords] = useState(storedKeywords || "");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="mx-2 text-indigo-600 dark:text-indigo-300">
          <GearIcon className="h-5 w-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="flex flex-col items-center justify-center gap-8 py-8">
          <div className="w-full max-w-xl space-y-4">
            <DrawerTitle>Your Location</DrawerTitle>
            <DrawerDescription>Enter your city or region</DrawerDescription>
            <Input
              type="text"
              placeholder="e.g. London, UK"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="w-full max-w-xl space-y-4">
            <DrawerTitle>Skills & Technologies</DrawerTitle>
            <DrawerDescription>
              Enter keywords related to your interests
            </DrawerDescription>
            <Input
              type="text"
              placeholder="e.g. react, typescript, docker"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <button
              className="mx-auto rounded-md bg-indigo-500 px-6 py-2 text-white transition-colors hover:bg-indigo-600"
              onClick={() => {
                changeLocation(location);
                changeKeywords(keywords);
                toast.success("Settings updated successfully");
              }}
            >
              Save Changes
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
