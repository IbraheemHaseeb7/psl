import { useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useData() {
  const [signIn, setSignIn] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user?.uid === "4Ehn9WzEquPj6WIbMtzTEe5N6Pw2") {
        setSignIn(true);
      }
    } else {
      setSignIn(false);
    }
  });

  return { signIn };
}
