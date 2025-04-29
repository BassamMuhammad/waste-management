"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { MapCompLocMark } from "../MapCompLocMark";

export default function TrashRecycle() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const unsubscribeSnapshot = onSnapshot(
      collection(firestore, "recyclingPoints"),
      (snapshot) => {
        const markers = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            position: data.position,
            timing: data.timing,
          };
        });
        setMarkers(markers);
      }
    );

    if (unsubscribeSnapshot) {
      return () => {
        unsubscribeSnapshot();
      };
    }
  }, []);

  return <MapCompLocMark markers={markers} />;
}
