"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback().then(() => {
      router.push("/browse"); // Redirect after authentication
    });
  }, []);

  return <p>Redirecting...</p>;
}
