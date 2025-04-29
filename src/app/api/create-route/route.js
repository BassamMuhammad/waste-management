import { firestore } from "@/app/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export function GET(request) {
  function distance(p1, p2) {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    return Math.hypot(dx, dy);
  }

  function findShortestPath(points, currentIndex) {
    const visited = new Array(points.length).fill(false);
    const path = [];
    
    path.push(points[currentIndex]);
    visited[currentIndex] = true;

    for (let step = 1; step < points.length; step++) {
      let nearestDistance = Infinity;
      let nearestIndex = -1;

      for (let i = 0; i < points.length; i++) {
        if (!visited[i]) {
          const dist = distance(points[currentIndex], points[i]);
          if (dist < nearestDistance) {
            nearestDistance = dist;
            nearestIndex = i;
          }
        }
      }

      visited[nearestIndex] = true;
      path.push(points[nearestIndex]);
      currentIndex = nearestIndex;
    }

    return path;
  }

  const q = query(
    collection(firestore, "recyclingPoints"),
    where("isBinFull", "==", true)
  );
  let coordinates = [];
  let startingIndex = - 1
  getDocs(q).then((querySnapshot) => {
    coordinates = querySnapshot.docs.map((doc, i) => {
      const data = doc.data();
      if(data.isStartingPoint) startingIndex = i
      return data.position;
    });
    const shortestPath = findShortestPath(coordinates, startingIndex);
    setDoc(doc(firestore, "pickupRoute", "route"), {
      route: shortestPath.toString(),
    })
      .then(() => {
        console.log("Route created");
      })
      .catch((error) => {
        console.error("Error saving shortest path to Firestore:", error);
      });
  });

  return new Response("Route created");
}
