

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Rocket, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen p-7">
      <Card className="w-11/12 md:w-8/12 lg:w-6/12 p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold flex items-center gap-2">
            <Rocket className="text-primary" /> About LinkedIn Post Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            <strong>LinkedIn Post Generator</strong> is your AI-powered writing assistant built to help professionals, creators, and entrepreneurs craft engaging and impactful LinkedIn posts in just seconds.
          </p>

          <Separator />

          <h2 className="text-xl font-medium text-foreground flex items-center gap-2">
            <Brain className="text-primary" /> How It Works
          </h2>
          <p>
            Simply describe what your post is about, choose the tone and length, and let AI do the rest. The app uses Google’s{" "}
            <strong>Gemini</strong> API to generate authentic, engaging, and professional-grade content that’s ready to post.
          </p>

          <Separator />

          <h2 className="text-xl font-medium text-foreground flex items-center gap-2">
            <Sparkles className="text-primary" /> Why Use This Tool?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Save time brainstorming post ideas.</li>
            <li>Write like a professional, even when you’re short on time.</li>
            <li>Experiment with tone — from casual to storytelling to professional.</li>
            <li>Generate multiple content versions instantly.</li>
          </ul>

          <Separator />

          <h2 className="text-xl font-medium text-foreground">Technology Stack</h2>
          <p>
            This project is built using:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Next.js 15</strong> – for fast, scalable front-end development</li>
            <li><strong>Firebase</strong> – for authentication and user data storage</li>
            <li><strong>Shadcn/UI</strong> – for modern and consistent UI components</li>
            <li><strong>Google Gemini API</strong> – for AI content generation</li>
          </ul>

          <Separator />

          <p className="text-sm text-center text-muted-foreground mt-8">
            🚀 Built by <Link href="https://github.com/m-ayaz-xyz/AI-LinkedIn-Post-Generator">GitHub</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default AboutPage;
