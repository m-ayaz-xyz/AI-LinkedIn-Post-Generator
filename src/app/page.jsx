"use client";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [userdetail, setUserdetail] = useState(null);
  const fetchuserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user);
      const docRef = doc(db, "LinkedInUser", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserdetail(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not Logged In");
      }
    });
  };

  useEffect(() => {
    fetchuserData();
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-8"
        style={{ height: "calc(100vh - 180px)" }}
      >
        <div className="flex flex-col items-center justify-center leading-none">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Turn Thoughts into Viral LinkedIn Posts with AI
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Write Smarter, Not Harder.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          {userdetail ? (
            <Button variant="secondary">
              <Link href="/generate"> Create Now </Link> <ArrowRight />
            </Button>
          ) : (
            <Button variant="secondary">
              <Link href="/signup"> Create Now </Link> <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
