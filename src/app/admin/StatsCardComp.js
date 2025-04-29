"use client";

import { Card, Container, Group, Text } from "@mantine/core";
import {
  IconHourglass,
  IconLetterE,
  IconPercentage,
  IconSquarePercentage,
  IconTrash,
  IconTrashX,
} from "@tabler/icons-react";

export function StatsCardComp({ stats }) {
  const data = [
    {
      title: "Bins Filled",
      value: stats.binsFilled ? stats.binsFilled : 0,
      icon: <IconTrash size={24} />,
    },
    {
      title: "Averge Collection Time",
      value: stats.collectionDuration ? stats.collectionDuration : 0,
      icon: <IconHourglass size={24} />,
    },
    {
      title: "Missed Pickups",
      value: stats.missedPickups ? stats.missedPickups : 0,
      icon: <IconTrashX size={24} />,
    },
    {
      title: "Route Efficiency Score",
      value: stats.efficiencyScore ? stats.efficiencyScore : 0,
      icon: <IconSquarePercentage size={24} />,
    },
  ];
  return (
    <Group justify="center">
      {data.map(({ title, value, icon }, i) => (
        <Card key={i} withBorder radius={20} shadow="lg" p="lg" mt="lg" mb="lg">
          <Group>
            {icon}
            <Text fw="bold" fz="h3">
              {title}
            </Text>
          </Group>
          <Text fz="h2" align="center">
            {value}
          </Text>
        </Card>
      ))}
    </Group>
  );
}
