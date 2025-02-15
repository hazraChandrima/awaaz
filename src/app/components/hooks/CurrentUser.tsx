import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { User } from "firebase/auth";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, loading };
}