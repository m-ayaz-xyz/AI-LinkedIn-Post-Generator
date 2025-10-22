"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathname = usePathname();
  // console.log("Route", pathname);
  

  const [userdetail, setUserdetail] = useState(null);
  const fetchuserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "LinkedInUser", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserdetail(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not Logged In");
        setUserdetail(null);
      }
    });
  };

  const logout = () => {
    try {
      auth.signOut();
      window.location.href = "/";
      console.log("Logged out");
      toast.success("Logged Out", { position: "top-center" });
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  useEffect(() => {
    fetchuserData();
  }, []);

  return (
    <>
      <div className="flex gap-5 items-center">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>About</Link>
        {(pathname  !== "/generate" && userdetail) ? (
          <Link href={"/generate"}>Generate</Link>
        ) : null}
        {!userdetail ? (
          <Link href={"/signup"}>
            <Button>{(pathname == "/signup") ? "Log In" : "Sign Up"}</Button>
          </Link>
        ) : (
          <Button onClick={logout} variant="destructive">
            Log Out
          </Button>
        )}
      </div>
    </>
  );
};

export default Navbar;
