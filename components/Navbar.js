import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <Link href="/admin">
        <button type="button" className="btn">
          Admin
        </button>
      </Link>
      <Link href="/admin/create-new-post">
        <button type="button" className="btn">
          Create Match
        </button>
      </Link>
      <Link href="/admin/manage-posts">
        <button type="button" className="btn">
          Manage Matches
        </button>
      </Link>
      <Link href="/">
        <button type="button" className="btn">
          Go Home
        </button>
      </Link>
      <button
        className="btn"
        type="button"
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
