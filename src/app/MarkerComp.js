"use client";

import { Button, Text, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  Circle,
  FeatureGroup,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

export const MarkerComp = ({ markers, setMarkers }) => {
  const [timings, setTimings] = useState([]);

  useEffect(() => {
    setTimings(markers.map((marker) => marker.timing));
  }, [markers]);

  useMapEvent("click", (e) => {
    if (!setMarkers) return;
    const tempMarkers = [...markers];
    const { lat, lng } = e.latlng;
    const newMarker = {
      position: [lat, lng],
      timing: [],
      isBinFull: false,
    };
    if (
      tempMarkers.findIndex(
        (marker) =>
          JSON.stringify(marker.position) === JSON.stringify([lat, lng])
      ) === -1
    ) {
      tempMarkers.push(newMarker);
    }
    setMarkers(tempMarkers);
  });

  const deleteMarker = (i) => {
    if (!setMarkers) return;
    const tempMarkers = [...markers];
    tempMarkers.splice(i, 1);
    setMarkers(tempMarkers);
  };

  const addTiming = (markerIndex) => {
    if (!setMarkers) return;
    const tempTimings = [...timings];
    tempTimings[markerIndex].push([]);
    setTimings(tempTimings);
  };

  return markers.map((marker, i) =>
    marker.isStartingPoint ? (
      <FeatureGroup key={JSON.stringify(marker.position)}>
        <Popup>
          <Text fw="bold" c="blue">
            Starting Point
          </Text>
        </Popup>
        <Circle center={marker.position} radius={200} />
      </FeatureGroup>
    ) : (
      <Marker key={JSON.stringify(marker.position)} position={marker.position}>
        <Popup>
          <Text fw="bold" c={marker.isBinFull ? "red" : "blue"}>
            Bin Status: {marker.isBinFull ? "Full" : "Empty"}
          </Text>
          {setMarkers ? (
            <>
              {timings[i]?.map((time, index) => (
                <TextInput
                  mb={10}
                  key={index}
                  value={time}
                  onChange={(e) => {
                    const tempMarkers = [...markers];
                    tempMarkers[i].timing[index] = e.currentTarget.value;
                    setMarkers(tempMarkers);
                  }}
                  rightSection={
                    <IconTrash
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        const tempTimings = [...timings];
                        tempTimings[i].splice(index, 1);
                        setTimings(tempTimings);
                      }}
                    />
                  }
                />
              ))}
              <Button
                bg="blue"
                mr={10}
                onClick={(e) => {
                  e.stopPropagation();
                  addTiming(i);
                }}
              >
                Add Timing
              </Button>
              <Button
                bg="red"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMarker(i);
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              {timings[i]?.length > 0 && (
                <Text fw="bold" c="blue">
                  Timing
                </Text>
              )}
              {timings[i]?.map((time, index) => (
                <Text key={index}>
                  {index + 1}) {time}
                </Text>
              ))}
            </>
          )}
        </Popup>
      </Marker>
    )
  );
};
