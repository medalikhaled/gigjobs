"use client";

import React, { useRef } from "react";
import { Button } from "~/components/ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useResumeStore } from "~/stores/userData";

export default function UploadCV() {
  const { setUserResume } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadCV() {
    fileInputRef.current?.click();
  }

  function handleFileChange() {
    if (fileInputRef) {
      const file = fileInputRef.current?.files?.[0];

      if (file) {
        setUserResume(file);

        // todo: upload it, parse it as an ATS
        //reading the file and logging its content
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target?.result;
          console.log(data);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  return (
    <>
      <Button
        onClick={handleUploadCV}
        variant="outline"
        size="sm"
        className="w-full bg-transparent md:bg-indigo-400 md:dark:bg-indigo-600"
      >
        <p className="hidden text-foreground md:inline-block">Upload CV</p>
        <FilePlusIcon className="h-5 w-5 text-foreground md:ml-2" />
      </Button>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
    </>
  );
}
