import { Container, Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";
import {
  IconCalendarFilled,
  IconCalendarMonthFilled,
  IconCalendarWeekFilled,
} from "@tabler/icons-react";
import { StatsDailyComp } from "../StatsDailyComp";
import { StatsMultiDayComp } from "../StatsMultiDayComp";

export default function Stats() {
  const tabsValues = [
    { name: "daily", icon: <IconCalendarFilled size={18} /> },
    { name: "weekly", icon: <IconCalendarWeekFilled size={18} /> },
    { name: "monthly", icon: <IconCalendarMonthFilled size={18} /> },
  ];

  return (
    <Container mt="lg" mb="lg">
      <Tabs keepMounted={false} defaultValue={tabsValues[0].name} variant="pills" radius="md">
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
          <StatsDailyComp />
        </TabsPanel>
        <TabsPanel value={tabsValues[1].name}>
          <StatsMultiDayComp days={7} />
        </TabsPanel>
        <TabsPanel value={tabsValues[2].name}>
          <StatsMultiDayComp days={30} />
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
