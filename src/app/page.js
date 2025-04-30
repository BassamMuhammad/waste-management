import { Container, Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";
import { IconBuilding, IconUser } from "@tabler/icons-react";
import { CardComp } from "./CardComp";
import { LoginComp } from "./LoginComp";
import trashOverflowImg from "../../public/trash-overflow.png";
import trashRecycleImg from "../../public/trash-recycle.png";

export default function Home() {
  const tabsValues = [
    { name: "user", icon: <IconUser size={18} /> },
    { name: "admin", icon: <IconBuilding size={18} /> },
  ];

  const userOptions = [
    {
      option: "Report Overflow",
      img: trashOverflowImg,
      navigateUrl: "/report-overflow",
    },
    {
      option: "Find Nearest Collection Point",
      img: trashRecycleImg,
      navigateUrl: "/trash-recycle",
    },
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
          <CardComp data={userOptions} />
        </TabsPanel>
        <TabsPanel value={tabsValues[1].name}>
          <LoginComp />
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
