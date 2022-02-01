import { auth, googleAuth } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Signin() {
  async function signin() {
    await signInWithPopup(auth, googleAuth);
  }

  return (
    <div className="signin-container">
      <button className="btn" type="button" onClick={signin}>
        Sign In
      </button>
    </div>
  );
}
