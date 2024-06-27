"use client";

import React from "react";
import YourLocation from "./userLocation";
import { useResumeStore } from "~/stores/userData";
import { Button } from "~/components/ui/button";
import { XMarkIcon } from "@heroicons/react/20/solid";

function Footer() {
  const { cv, setUserResume } = useResumeStore();

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4">
      <YourLocation />

      <div className="md:h-20 ">
        {cv && (
          <div className="flex items-center justify-center gap-4 transition-all">
            <p>
              CV file selected:{" "}
              <span className="font-bold text-indigo-400">{cv.name}</span>{" "}
            </p>

            <button
              onClick={() => setUserResume(null)}
              className="rounded-full bg-opacity-10 transition-colors ease-in-out hover:bg-foreground"
            >
              <XMarkIcon className="h-5 w-5 text-red-400" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Footer;
