import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import CodePreview from "@/components/codepreview";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Features from "@/components/features";
import Highlight from "@/components/ui/highlight";
import Faces from "@/components/faces";
import { ROUTES } from "@/lib/routes";
import PeerlistWinner from "@/public/peerlist-winner.svg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-geist-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
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
            className="inline-flex justify-center mb-6"
          >
            <Image src={PeerlistWinner} alt="Peerlist Launch" />
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-bricolage">
            Inspire Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {" "}
              Big Idea{" "}
            </span>
            with Wisdom from India&apos;s Finest
          </h1>
          <p className="text-base md:text-lg text-gray-600">
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
        <div id={ROUTES.QUICKSTART} className="max-w-3xl mx-auto pt-20">
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
