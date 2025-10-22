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
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";


const Page = () => {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [name, setName] = useState("");

  const oncreate = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pswd);
      const user = auth.currentUser;
      console.log(user);

      //if the user exists then it set the doc in which we will create a doc in 
      //we will first pass db (firbase database) then collection name and data
      if(user){
        await setDoc(doc(db, "LinkedInUser", user.uid ), {
            email: user.email,
            name: name,
        });
      }
      console.log("User Registered Successfully!");
      toast.success("User Registration Successful!", {position:"top-center"})
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {position:"bottom-right"})
    }
  };

  return (
    <>
    <div className="w-auto h-auto flex justify-center items-center" style={{ height: 'calc(100vh - 180px)' }}>

      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Create an account in just a minute.</CardDescription>
          <CardAction><Link href="/login">LogIn</Link></CardAction>
        </CardHeader>
        <form onSubmit={oncreate} className="flex gap-6 flex-col">
        <CardContent>
          <p className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input className="p-2 border border-black rounded-md" type="name" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input className="p-2 border border-black rounded-md" type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-black rounded-md" type="password" name="password" id="password" value={pswd} onChange={(e)=> setPswd(e.target.value)} />
          </p>
        </CardContent>
        <CardFooter>
            <Button type="submit" className="w-full">Create</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
};

export default Page;
