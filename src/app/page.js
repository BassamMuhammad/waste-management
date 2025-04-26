import { Container, Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";
import { IconBuilding, IconUser } from "@tabler/icons-react";
import { UserComp } from "./UserComp";

export default function Home() {
  const tabsValues = [
    { name: "user", icon: <IconUser size={18} /> },
    { name: "admin", icon: <IconBuilding size={18} /> },
  ];

  return (
    <Container mt="lg" mb="lg">
      <Tabs defaultValue={tabsValues[0].name} variant="pills" radius="md">
        <TabsList grow>
          {tabsValues.map((v) => (
            <TabsTab
              p="md"
              fw="bold"
              fz="h4"
              key={v.name}
              value={v.name}
              leftSection={v.icon}
            >
              {v.name[0].toUpperCase() + v.name.slice(1)}
            </TabsTab>
          ))}
        </TabsList>
        <TabsPanel value={tabsValues[0].name}>
          <UserComp />
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
