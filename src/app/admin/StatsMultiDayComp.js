"use client";

import { Container, Group, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { LineChart } from "@mantine/charts";

export function StatsMultiDayComp({ days }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    

    setLoading(true);
    const lastDate = new Date(new Date().setDate(new Date().getDate() - days));
    const todayDate = new Date();
    const q = query(
      collection(firestore, "stats"),
      where("date", ">=", Timestamp.fromDate(lastDate)),
      where("date", "<=", Timestamp.fromDate(todayDate))
    );
    getDocs(q).then((querySnapshot) => {
      const tempStats = [];
      querySnapshot.forEach((doc) => {
        tempStats.push(doc.data());
      });
      setStats(
        tempStats.map((stat) => {
          Object.entries(stat).forEach(([key, value]) => {
            if (key !== "date") {
              const index = key.search(/[A-Z]/);
              key =
                key[0].toUpperCase() +
                key.slice(1, index) +
                " " +
                key[index].toUpperCase() +
                key.slice(index + 1);
              stat[key] = value;
            } else {
              stat[key] = stat.date.toDate().toISOString().split("T")[0];
            }
          });
          return stat;
        })
      );
      setLoading(false);
    });
  }, []);

  return (
    <Container mt="lg" mb="lg">
      <LineChart
        h={300}
        data={stats}
        dataKey="date"
        series={[
          { name: "Bins Filled", color: "blue" },
          { name: "Collection Duration", color: "orange" },
          { name: "Efficiency Score", color: "green" },
          { name: "Missed Pickups", color: "red" },
        ]}
        curveType="linear"
        withLegend
        withPointLabels
      />
      <LoadingOverlay visible={loading} />
    </Container>
  );
}
