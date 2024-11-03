import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";
import { ROUTES } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 py-12">
          <div>
            <Logo className="mb-6" />
            <p className="text-gray-600 text-sm">
              Open-source API delivering wisdom from India&apos;s
              entrepreneurial leaders.
            </p>
          </div>
          <div className="justify-self-end">
            <h4 className="font-semibold text-gray-900 mb-4">Documentation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#quickstart" className="hover:text-indigo-600">
                  Quick Start
                </a>
              </li>
              <li>
                <Link href={ROUTES.DOCS} className="hover:text-indigo-600">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-4 justify-between border-t border-gray-100 py-6 text-sm text-gray-600">
          <Link
            href="https://aniket-pawar.vercel.app/"
            target="_blank"
            className="flex items-center hover:text-indigo-600"
          >
            <Image
              src="https://ik.imagekit.io/2oajjadqkz/profile.jpg?updatedAt=1730618069252"
              alt="Aniket Pawar"
              width={20}
              height={20}
              className="rounded-full mr-2"
            />
            Made in 🇮🇳 by Aniket Pawar
          </Link>
          <span>
            © {new Date().getFullYear()} QuoteAPI. Open-source under MIT
            License.
          </span>
        </div>
      </div>
    </footer>
  );
}
