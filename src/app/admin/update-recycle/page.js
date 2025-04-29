"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@/app/firebase";
import { MapCompLocMark } from "@/app/MapCompLocMark";

export default function UpdateRecycle() {
  const [initialMarkers, setInitialMarkers] = useState([]);
  const [updatedMarkers, setUpdatedMarkers] = useState([]);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshot(
      collection(firestore, "recyclingPoints"),
      (snapshot) => {
        const markers = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setInitialMarkers(markers);
        setUpdatedMarkers(markers);
      }
    );

    if (unsubscribeSnapshot) {
      return () => unsubscribeSnapshot();
    }
  }, []);

  return (
    <MapCompLocMark
      initialMarkers={initialMarkers}
      markers={updatedMarkers}
      setMarkers={setUpdatedMarkers}
    />
  );
}
