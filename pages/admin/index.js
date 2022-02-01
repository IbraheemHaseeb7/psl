import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Signin from "../../components/Signin";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { UserContext } from "../../lib/context";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuth } from "../../lib/firebase";
import Link from "next/link";

export default function Admin() {
  const context = useContext(UserContext);
  return (
    <div className="admin-container">
      {context.signIn ? (
        <>
          <h1>Welcome Back my Master. I waited for you 💖</h1>
          <Link href="/">
            <button type="button" className="btn">
              Home
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/">
            <button type="button" className="btn">
              Home
            </button>
          </Link>
          <h1>Who the hell do you think you are?</h1>
          <button
            className="btn"
            type="button"
            onClick={() => {
              signInWithPopup(auth, googleAuth);
            }}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
}
