// hooks/useCurrentUser.ts
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useUser } from "../context/UserContext"; // Import the custom hook to set the user

export default function useCurrentUser() {
  const { setCurrentUser } = useUser(); // Get the setter function from context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update global user data when authentication status changes
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setCurrentUser]); // Dependency on setCurrentUser to avoid stale closures

  return { loading };
}
