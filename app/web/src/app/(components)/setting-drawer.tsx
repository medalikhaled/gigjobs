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
      //   toast("Event has been created", {
      //     description: "Sunday, December 03, 2023 at 9:00 AM",
      //     action: {
      //       label: "Undo",
      //       onClick: () => console.log("Undo"),
      //     },
      //     duration: 50000,
      //   });

      return;
    }
    changeLocation(newLocation);
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
