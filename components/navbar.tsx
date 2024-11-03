import Link from "next/link";
import { Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/logo";
import { ROUTES } from "@/lib/routes";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link
            href="#features"
            className={buttonVariants({ variant: "ghost" })}
          >
            Features
          </Link>
          <Link
            href={ROUTES.DOCS}
            className={buttonVariants({ variant: "ghost" })}
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
    </nav>
  );
}
