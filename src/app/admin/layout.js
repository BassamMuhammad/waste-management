"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
    });
  }, []);

  return children;
}
