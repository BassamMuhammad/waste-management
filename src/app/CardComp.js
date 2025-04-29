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

export function CardComp({data}) {
  const { width } = useViewportSize();
  const router = useRouter();
  
  return (
    <Container>
      <Group justify="center" mb="lg">
        {data.map((d, i) => (
          <Card
            component="button"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(d.navigateUrl)}
            key={i}
            shadow="lg"
            mt="md"
            withBorder
          >
            <CardSection>
              <Image
                src={d.img}
                alt={d.option}
                priority
                width={width < 380 ? width - 64 : "100%"}
              />
            </CardSection>
            <Text fw={500} fz="h4">
              {d.option}
            </Text>
          </Card>
        ))}
      </Group>
    </Container>
  );
}