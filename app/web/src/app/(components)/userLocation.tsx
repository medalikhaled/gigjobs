"use client";

import { MapPinIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { env } from "~/env";
import { useLocationStore } from "~/stores/userData";
import { ORSResponse } from "~/types/ors";

export default function YourLocation() {
  const { changeLocation, location } = useLocationStore();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      //   console.log("lat, long", latitude, longitude);

      const url = `https://api.openrouteservice.org/geocode/reverse?api_key=${env.NEXT_PUBLIC_ORS_TOKEN}&point.lon=${longitude}&point.lat=${latitude}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }

        const data = (await response.json()) as ORSResponse;
        const loc = data.features[0]?.properties;

        const address = `${loc?.region}, ${loc?.country}`;
        changeLocation(address);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Error retrieving location:", error);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div className="flex w-2/3 items-center justify-center gap-2 py-4">
      <MapPinIcon className="hidden size-4 text-indigo-400" />

      <p className="text-center text-sm italic text-slate-600 dark:text-slate-400 md:w-[70ch]">
        Location set to <span className="text-indigo-400">{location}</span>. To
        change, use the{" "}
        <span className="text-indigo-400 dark:text-indigo-600">gear icon</span>.
      </p>
    </div>
  );
}
