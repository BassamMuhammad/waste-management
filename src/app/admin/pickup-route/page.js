"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/app/firebase";
import { MapCompLocMark } from "@/app/MapCompLocMark";
import { LoadingOverlay } from "@mantine/core";

export default function PickupRoute() {
  const [markers, setMarkers] = useState([]);
  const [line, setLine] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(firestore, "recyclingPoints"),
      where("isBinFull", "==", true)
    );
    getDocs(q).then((querySnapshot) => {
      setMarkers(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return data;
        })
      );
    });

    const unsubscribeSnapshotLine = onSnapshot(
      collection(firestore, "pickupRoute"),
      (snapshot) => {
        const tempLine = [];
        let coordinate = [];
        snapshot.docs[0]
          .data()
          .route.split(",")
          .forEach((point, i) => {
            coordinate.push(parseFloat(point));
            if (i % 2 !== 0) {
              tempLine.push(coordinate);
              coordinate = [];
            }
          });
        setLine(tempLine);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribeSnapshotLine) {
        unsubscribeSnapshotLine();
      }
    };
  }, []);
  if (!line.length) return <LoadingOverlay visible={loading} />;

  return <MapCompLocMark markers={markers} polyline={line} />;
}
