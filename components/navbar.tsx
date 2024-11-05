"use client";

import Link from "next/link";
import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Logo from "@/components/logo";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {openSidebar ? (
            <X
              className="size-5 inline-block sm:hidden mr-2 cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <Menu
              className="size-5 inline-block sm:hidden mr-2 cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
          <Logo />
        </div>
        <Button size="icon" className="flex sm:hidden" asChild>
          <Link href={ROUTES.GITHUB} target="_blank">
            <Github />
          </Link>
        </Button>
        <div className="items-center space-x-4 hidden sm:flex">
          <Link
            href="#features"
            className={buttonVariants({ variant: "link" })}
          >
            Features
          </Link>
          <Link
            href={ROUTES.RANDOM}
            className={buttonVariants({ variant: "link" })}
          >
            Random
          </Link>
          <Link
            href={ROUTES.DOCS}
            className={buttonVariants({ variant: "link" })}
          >
            Docs
          </Link>
          <Link
            href={ROUTES.GITHUB}
            target="_blank"
            className={buttonVariants({ variant: "default" })}
          >
            <Github />
            Star on GitHub
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-full inset-x-0 h-[calc(100dvh-53px)] py-4 px-6 grid grid-cols-2 place-items-start place-content-start gap-x-4 gap-y-6 bg-white transition-opacity sm:hidden pointer-events-none opacity-0",
          openSidebar && "pointer-events-auto opacity-100"
        )}
      >
        <Link href="#features" className={buttonVariants({ variant: "link" })}>
          Features
        </Link>
        <Link
          href={ROUTES.RANDOM}
          className={buttonVariants({ variant: "link" })}
        >
          Random
        </Link>
        <Link
          href={ROUTES.DOCS}
          className={buttonVariants({ variant: "link" })}
        >
          Docs
        </Link>
      </div>
    </nav>
  );
}
