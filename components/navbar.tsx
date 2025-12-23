"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";

import Logo from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          {openSidebar ? (
            <X
              className="mr-2 inline-block size-5 cursor-pointer sm:hidden"
              onClick={toggleSidebar}
            />
          ) : (
            <Menu
              className="mr-2 inline-block size-5 cursor-pointer sm:hidden"
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
        <div className="hidden items-center space-x-4 sm:flex">
          <Link
            href={`${ROUTES.HOME}#${ROUTES.FEATURES}`}
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
          "pointer-events-none absolute inset-x-0 top-full grid h-[calc(100dvh-53px)] grid-cols-2 place-content-start place-items-start gap-x-4 gap-y-6 bg-white px-6 py-4 opacity-0 transition-opacity sm:hidden",
          openSidebar && "pointer-events-auto opacity-100"
        )}
      >
        <Link
          href={`${ROUTES.HOME}#${ROUTES.FEATURES}`}
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
      </div>
    </nav>
  );
}
