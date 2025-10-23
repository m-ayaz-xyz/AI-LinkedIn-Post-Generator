"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const [desc, setDesc] = useState("");
  const [tone, setTone] = useState("");
  const [len, setLen] = useState("");

  console.log("data", desc, tone, len);
  

  const [result, setResult]= useState("")
  const [loading, setLoading]= useState(false)

    async function generate() {
    if (!desc) return alert("Enter Description");
    setLoading(true);
    setResult("");
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, tone, len}),
      });
      const j = await r.json();
      if (j.text) setResult(j.text);
      else alert("No result");
    } catch (e) {
      alert("Generation failed");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }



  const [userdetail, setUserdetail] = useState(null);
  const fetchuserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
    console.log("No user logged in");
    return setUserdetail(null);
  }
      console.log(user);
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
      {userdetail ? (
        <div
          className="w-auto h-auto flex justify-center items-center"
          style={{ height: "calc(100vh - 180px)" }}
        >
          <Card className="w-10/12">
            <CardHeader>
              <CardTitle className="flex gap-2 text-2xl font-medium">
                Create Viral LinkedIn Posts in Seconds
                <Rocket />
              </CardTitle>
              <CardDescription>
                Let AI help you write professional, engaging, and high
                performing LinkedIn posts - weather you're building your
                personal brand or promoting your business.
              </CardDescription>
              <CardAction>
                <Tooltip>
  <TooltipTrigger>
                <Button variant="outline" size="icon" aria-label="Submit">
  <Info />
</Button>
</TooltipTrigger>
  <TooltipContent>
    <p>Powered by Google Gemini Pro AI.</p>
  </TooltipContent>
</Tooltip>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-col">
                <label htmlFor="">What's your post about ?</label>
                <InputGroup>
                  <InputGroupTextarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe Your Post Idea/Content" />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                      (Example: "Announcing my new Startup", "Sharing a
                      productivity Tips")
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label htmlFor="">Pick Youe Tone</label>
                <Select onValueChange = {setTone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
                <label htmlFor="">How Long Should Your Post Be ?</label>
                <Select onValueChange = {setLen}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <input type="email" name="" id=""  onChange={(e)=>setDesc(e.target.value)}/> */}
            </CardContent>
            <CardFooter>
              <button onClick={generate} className="w-full bg-black p-2 text-white rounded-md">Create</button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div
          className="w-auto h-auto flex justify-center items-center"
          style={{ height: "calc(100vh - 180px)" }}
        >
          <Skeleton className="h-[515px] w-[1051px] rounded-xl"/>
        </div>
      )}
    
    {result && (
        <div style={{ marginTop: 16 }}>
          <h3>Generated Post</h3>
          <div style={{ whiteSpace: "pre-wrap", background: "#f7f7f7", padding: 12 }}>{result}</div>
        </div>
      )}
    </>
  );
};

export default page;
