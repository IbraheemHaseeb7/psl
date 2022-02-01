import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function AuthCheck({ children }) {
  const data = useContext(UserContext);
  return (
    <div>
      {data.signIn ? (
        children
      ) : (
        <>
          <h1>You are not authorized to view this page</h1>
          <Link href="/">
            <button className="btn" type="button">
              Go Home
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
