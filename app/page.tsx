import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import CodePreview from "@/components/codepreview";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Features from "@/components/features";
import Highlight from "@/components/ui/highlight";
import { ROUTES } from "@/lib/routes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-geist-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 font-medium text-sm mb-6">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Open Source API for Indian Entrepreneur Quotes
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-bricolage">
            Inspire Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {" "}
              Big Idea{" "}
            </span>
            with Wisdom from India&apos;s Finest
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Free, open-source API delivering curated quotes from India&apos;s
            most successful entrepreneurs.
            <br />
            No API key required. Built{" "}
            <Highlight>by developers, for developers.</Highlight>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              size="lg"
              asChild
            >
              <Link href={ROUTES.DOCS}>Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.GITHUB} target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* Code Preview */}
        <div id="quickstart" className="max-w-3xl mx-auto pt-20">
          <CodePreview />
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 py-32">
          <Features />
        </div>

        {/* <Stats /> */}
      </main>

      <Footer />
    </div>
  );
}
