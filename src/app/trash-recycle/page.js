"use client";

import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getDoc } from "firebase/firestore";

const MapComp = dynamic(() => import("../MapComp"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function trashRecycle() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        () => {
          notifications.show({
            title: "Error",
            message: "Location access denied",
            color: "red",
          });
        }
      );
    } else {
      notifications.show({
        title: "Error",
        message: "Geolocation is not supported by this browser",
        color: "red",
      });
    }
  }, []);

  if (!location) return <LoadingOverlay visible={location} />;

  return (
    <MapComp
      center={location}
      markers={[
        {
          position: location,
          time: `10pm
        11pm`,
        },
      ]}
    />
  );
}
