"use client";

import { Button, Group, LoadingOverlay, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { collection, doc, writeBatch } from "firebase/firestore";
import { firestore } from "./firebase";
import { IconLocation } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const MapComp = dynamic(() => import("./MapComp"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export function MapCompLocMark({ initialMarkers, markers, setMarkers, polyline }) {
  const [location, setLocation] = useState(null);
  const [enteredLocation, setEnteredLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMap, setUpdateMap] = useState(false);

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

  const saveRecyclingPoints = async () => {
    try {
      if (markers.length === 0) {
        notifications.show({
          title: "Error",
          message: "Please add at least one collection point",
          color: "red",
        });
        return;
      }
      setLoading(true);
      const batch = writeBatch(firestore);
      initialMarkers.forEach((marker) => {
        const docRef = doc(
          collection(firestore, "recyclingPoints"),
          JSON.stringify(marker.position)
        );
        batch.delete(docRef);
      });
      markers.forEach((marker) => {
        const docRef = doc(
          collection(firestore, "recyclingPoints"),
          JSON.stringify(marker.position)
        );
        batch.set(docRef, {
          position: marker.position,
          timing: marker.timing,
          isBinFull: marker.isBinFull ?? true,
          isStartingPoint: marker.isStartingPoint ?? false,
        });
      });
      await batch.commit();
      setLoading(false);
      notifications.show({
        title: "Success",
        message: "Collection points saved successfully",
        color: "green",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      notifications.show({
        title: "Error",
        message: "Error occurred. Please try again",
        color: "red",
      });
    }
  };

  const changeLocation = async () => {
    try {
      const resp = await fetch(
        `https://geocode.maps.co/search?q=${enteredLocation}&api_key=${process.env.NEXT_PUBLIC_GEO_CODING_API_KEY}`
      );
      const jsonResp = await resp.json();
      const { lat, lon } = jsonResp[0];
      setUpdateMap(true);
      setLocation([lat, lon]);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Error occurred. Please try again",
        color: "red",
      });
    }
  };

  if (!location) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <>
      <MapComp
        polyline={polyline}
        updateMap={updateMap}
        setUpdateMap={setUpdateMap}
        center={location}
        markers={markers}
        setMarkers={setMarkers}
      />
      <Group
        pos="absolute"
        align="flex-end"
        top={10}
        right={10}
        style={{ zIndex: 10000 }}
      >
        <TextInput
          label="Change Location"
          placeholder="Location"
          value={enteredLocation}
          onChange={(e) => setEnteredLocation(e.currentTarget.value)}
          rightSection={
            <IconLocation
              color="blue"
              style={{ cursor: "pointer" }}
              size={18}
              onClick={changeLocation}
            />
          }
        />
        {setMarkers && (
          <Button radius={50} onClick={saveRecyclingPoints}>
            Save Points
          </Button>
        )}
      </Group>
      <LoadingOverlay visible={loading} />
    </>
  );
}
