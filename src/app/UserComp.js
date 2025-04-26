"use client";

import {
  Container,
  Card,
  Text,
  Group,
  CardSection,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import trashOverflowImg from "../../public/trash-overflow.png";
import trashRecycleImg from "../../public/trash-recycle.png";
import trashScheduleImg from "../../public/trash-schedule.png";

export function UserComp() {
  const { width } = useViewportSize();
  const router = useRouter();
  const userOptions = [
    {
      option: "Report Overflow",
      img: trashOverflowImg,
      onClick: () => router.push("/report-overflow"),
    },
    {
      option: "Find Nearest Recycling Point",
      img: trashRecycleImg,
      onClick: () => router.push("/trash-recycle"),
    },
    {
      option: "Bin Collection Schedule",
      img: trashScheduleImg,
      onClick: () => router.push("/trash-schedule"),
    },
  ];
  return (
    <Container>
      <Group justify="center" mb="lg">
        {userOptions.map((userOption, i) => (
          <Card
            component="button"
            style={{ cursor: "pointer" }}
            onClick={userOption.onClick}
            key={i}
            shadow="lg"
            mt="md"
            withBorder
          >
            <CardSection>
              <Image
                src={userOption.img}
                alt={userOption.option}
                priority
                width={width < 380 ? width - 64 : "100%"}
              />
            </CardSection>
            <Text fw={500} fz="h4">
              {userOption.option}
            </Text>
          </Card>
        ))}
      </Group>
    </Container>
  );
}