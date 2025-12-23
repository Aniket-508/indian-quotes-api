import React from "react";
import Image from "next/image";
import Link from "next/link";

import CodePreview from "@/components/codepreview";
import Faces from "@/components/faces";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Highlight from "@/components/ui/highlight";
import { ROUTES } from "@/lib/routes";
import PeerlistWinner from "@/public/peerlist-winner.svg";

export default function Home() {
  return (
    <div className="font-geist-sans min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Notice Section */}
          {/* <div className="inline-flex items-center bg-indigo-50 px-2.5 py-1.5 gap-1.5 rounded-full text-indigo-600 font-medium text-xs/tight mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Open Source API for Indian Entrepreneur Quotes
          </div> */}

          <Link
            href={ROUTES.PEERLIST_PROJECT}
            target="_blank"
            className="mb-6 inline-flex justify-center"
          >
            <Image src={PeerlistWinner} alt="Peerlist Launch" />
          </Link>

          <h1 className="mb-6 font-bricolage text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            Inspire Your Next
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Big Idea{" "}
            </span>
            with Wisdom from India&apos;s Finest
          </h1>
          <p className="text-base text-gray-600 md:text-lg">
            Free, open-source API delivering curated quotes from India&apos;s
            most successful entrepreneurs.
            <br />
            Built <Highlight>by developers, for developers.</Highlight>
          </p>

          <div className="my-6 flex flex-wrap justify-center gap-4">
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

          <Faces />
        </div>

        {/* Code Preview */}
        <div id={ROUTES.QUICKSTART} className="mx-auto max-w-3xl pt-20">
          <CodePreview />
        </div>

        <div id={ROUTES.FEATURES} className="py-32">
          <Features />
        </div>

        {/* <Stats /> */}
      </main>

      <Footer />
    </div>
  );
}
