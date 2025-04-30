"use client";

import {
  Button,
  Card,
  Container,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export function LoginComp() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/admin");
      }
    });
  }, []);

  const onLogin = async () => {
    try {
      if (!email || !password) {
        notifications.show({
          title: "Error",
          message: "Please fill all fields",
          color: "red",
        });
        return;
      }
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Error occurred. Please try again",
        color: "red",
      });
      return;
    }
  };
  return (
    <Container h="80vh" mt="20vh">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
        }}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <TextInput
          label="Email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          required
          visible={showPassword}
          onVisibilityChange={setShowPassword}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          rightSection={
            !showPassword ? (
              <IconEye
                color="blue"
                style={{ cursor: "pointer" }}
                size={24}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IconEyeOff
                color="blue"
                style={{ cursor: "pointer" }}
                size={24}
                onClick={() => setShowPassword(false)}
              />
            )
          }
        />
        <Button onClick={onLogin}>Login</Button>
      </Card>
      <LoadingOverlay visible={loading} />
    </Container>
  );
}
