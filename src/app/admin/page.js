"use client";

import { CardComp } from "../CardComp";
import trashRecycleImg from "../../../public/trash-recycle.png";
import pickupRouteImg from "../../../public/pickup-route.png";
import statsImg from "../../../public/stats.png";
import { Button, Group } from "@mantine/core";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { notifications } from "@mantine/notifications";

export default function Admin() {
  const adminOptions = [
    {
      option: "Update Collection Point",
      img: trashRecycleImg,
      navigateUrl: "/admin/update-recycle",
    },
    {
      option: "Pickup Route",
      img: pickupRouteImg,
      navigateUrl: "/admin/pickup-route",
    },
    {
      option: "Statsistics",
      img: statsImg,
      navigateUrl: "/admin/stats",
    },
  ];

  const generateRoute = () => {
    fetch("https://waste-management-drab.vercel.app/api/create-route")
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Route generated successfully",
          color: "green",
        });
      })
      .catch(() => {
        notifications.show({
          title: "Error",
          message: "Error occurred. Please try again",
          color: "red",
        });
      });
  };

  return (
    <>
      <CardComp data={adminOptions} />
      <Group pos="absolute" top={0} right={0} p="lg">
        <Button radius={10} onClick={generateRoute}>
          Simulate Route Generation
        </Button>
        <Button radius={10} bg="red" onClick={() => signOut(auth)}>
          Logout
        </Button>
      </Group>
    </>
  );
}
