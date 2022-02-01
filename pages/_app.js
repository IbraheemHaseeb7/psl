import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useData } from "../lib/hook";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function MyApp({ Component, pageProps }) {
  const data = useData();
  return (
    <UserContext.Provider value={data}>
      {data.signIn && <Navbar />}
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
