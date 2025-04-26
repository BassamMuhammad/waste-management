"use client";

import {
  Button,
  Center,
  Group,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import Webcam from "react-webcam";
import { firestore } from "../firebase";
import { useRouter } from "next/navigation";

export default function ReportOverflow() {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState("white");
  const router  = useRouter()

  return (
    <Center mt={10} h="95vh">
      <Webcam audio={false} screenshotFormat="image/jpeg" height="100%">
        {({ getScreenshot }) => (
          <>
            <Button
              pos="absolute"
              w={60}
              h={60}
              bg={color}
              radius="50%"
              bottom="10%"
              left="50%"
              onClick={() => setImg(getScreenshot({ width: 400, height: 400 }))}
              onMouseDown={() => setColor("blue")}
              onMouseUp={() => setColor("white")}
            />
          </>
        )}
      </Webcam>
      {img && (
        <Modal opened={img} onClose={() => setImg(null)} title="Submit Report">
          <Image
            src={img}
            alt="report overflow"
            priority
            width={400}
            height={400}
          />
          <Center>
            <Group mt="md">
              <Button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      async(position) => {
                        setLoading(true)
                        await addDoc(collection(firestore, "reports"), {
                          img: img,
                          location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          },
                        });
                        notifications.show({
                          title: "Success",
                          message: "Report submitted successfully",
                          color: "green",
                        });
                        router.back()
                      },
                      () => {
                        notifications.show({
                          title: "Error",
                          message: "Location access denied",
                          color: "red",
                        });
                      }
                    );
                  } else {
                    notifications.show({
                      title: "Error",
                      message: "Geolocation is not supported by this browser",
                      color: "red",
                    });
                  }
                }}
              >
                Submit
              </Button>
              <Button variant="outline" onClick={() => setImg(null)}>
                Cancel
              </Button>
            </Group>
          </Center>
          <LoadingOverlay visible={loading}/>
        </Modal>
      )}
    </Center>
  );
}
