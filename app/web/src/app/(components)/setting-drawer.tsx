import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
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

export default function SettingDrawer() {
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
              <span className="italic text-indigo-400">{"Sfax, Agareb"}</span>
            </DrawerDescription>
            <Input className="my-4 w-full" type="text" />
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
          <Button className="mx-auto max-w-fit px-12">Update</Button>

          <DrawerClose>
            <Button className="hover:border-indigo-400" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
