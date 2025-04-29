"use client";

import {
  Card,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { StatsCardComp } from "./StatsCardComp";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export function StatsDailyComp() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const date = new Date();
    const stringDate = date.toISOString().split("T")[0];
    getDoc(doc(firestore, "stats", stringDate)).then((doc) => {
      setStats(doc.data());
      setLoading(false);
    });
  }, []);

  return (
    <Container mt="lg" mb="lg">
      {stats ? (
        <Group>
          <StatsCardComp stats={stats} />
        </Group>
      ) : (
        <Center>
          <Card withBorder radius={20} shadow="lg" p="lg" mt="lg" mb="lg">
            <Text>No Stats Available</Text>
          </Card>
        </Center>
      )}
      <LoadingOverlay visible={loading} />
    </Container>
  );
}
