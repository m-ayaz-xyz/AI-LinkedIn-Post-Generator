"use client"
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";

const Page = () => {
  const [loading, setloading] = useState(false)
  const [email, setEmail] = useState("")
  const [pswd, setPswd] = useState("")

  const onhandle = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pswd);
      window.location.href = "/generate";
      toast.success("User Logged In Successfully", { position: "top-center" });
    } catch (error) {
      toast.error(error.message, { position: "bottom-right" });
    }
  };


  return (
    <>
    <div className="w-auto h-auto flex justify-center items-center" style={{ height: 'calc(100vh - 180px)' }}>

      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Login with Email to your account</CardDescription>
          <CardAction><Link href="/signup">Sign Up</Link></CardAction>
        </CardHeader>
        <form className="flex flex-col gap-6" onSubmit={onhandle}>
        <CardContent>
          <p className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input className="p-2 border border-black rounded-md" type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-black rounded-md" type="password" name="password" id="password" value={pswd} onChange={(e)=>setPswd(e.target.value)} />
          </p>
        </CardContent>
        <CardFooter> 
            <Button className="w-full" disabled = {loading} onChange={()=>{setloading(true)}}>{loading ? "Logging In..." : "LogIn"}</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
};

export default Page;
