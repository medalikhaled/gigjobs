"use client";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="border-2 border-primary/30 hover:border-primary/50 hover:bg-accent/80 hover:text-accent-foreground transition-all duration-200"
        >
          <SunIcon className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 text-primary transition-all duration-200 dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 text-primary transition-all duration-200 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="border-2 border-primary/30 bg-background/95 backdrop-blur-sm"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent/80 transition-colors duration-200"
        >
          <SunIcon className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent/80 transition-colors duration-200"
        >
          <MoonIcon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
