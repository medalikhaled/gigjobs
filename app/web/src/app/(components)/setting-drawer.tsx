"use client";

import { GearIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
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
import { Input } from "~/components/ui/input";
import { useLocationStore } from "~/stores/userData";

export default function SettingDrawer() {
  const { location, changeLocation } = useLocationStore();
  const [newLocation, setNewLocation] = useState<string>("");

  const checkValidLocationAndUpdate = () => {
    if (!newLocation || newLocation.split(",").length !== 2) {
      alert("Please enter a valid location");
      return;
    }
    changeLocation(newLocation);
    //todo add it to local storage if it is a valid address
    //todo use this data point to costruct a query for Jobs
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <GearIcon className="mx-2 h-5 w-5 text-indigo-600 dark:text-indigo-300" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="flex items-center justify-center gap-4 py-8 md:gap-12">
          <div>
            <DrawerTitle>Change your location</DrawerTitle>
            <DrawerDescription>
              current location set to{" "}
              <span className="italic text-indigo-400">{location}</span>
            </DrawerDescription>
            <Input
              className="my-4 w-full"
              type="text"
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </div>
          <div>
            <DrawerTitle>Add some context</DrawerTitle>
            <DrawerDescription>
              keywords, skills, technologies...etc
            </DrawerDescription>

            <Input
              className="my-4 w-full"
              type="text"
              placeholder="docker, git, react..etc"
            />
          </div>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose
            className="mx-auto max-w-fit rounded-md bg-indigo-400 px-4 py-2  text-foreground "
            onClick={checkValidLocationAndUpdate}
          >
            Update
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
