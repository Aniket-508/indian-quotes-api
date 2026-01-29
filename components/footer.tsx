import Image from "next/image";
import Link from "next/link";

import { LINK } from "@/constants";
import { ROUTES } from "@/lib/routes";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 py-12 md:grid-cols-4">
          <div>
            <Logo className="mb-6" />
            <p className="text-sm text-gray-600">
              Open-source API delivering wisdom from India&apos;s
              entrepreneurial leaders.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Documentation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href={`${ROUTES.HOME}#${ROUTES.QUICKSTART}`}
                  className="hover:text-indigo-600"
                >
                  Quick Start
                </Link>
              </li>
              <li>
                <Link href={ROUTES.DOCS} className="hover:text-indigo-600">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">More</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  className="hover:text-indigo-600"
                  href={`${LINK.CANNY}/feature-requests`}
                  target="_blank"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-indigo-600"
                  href={`${LINK.CANNY}/changelog`}
                  target="_blank"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4 border-t border-gray-100 py-6 text-xs text-gray-600">
          <Link
            href="https://aniket-pawar.vercel.app/"
            target="_blank"
            className="flex items-center hover:text-indigo-600"
          >
            <Image
              src="https://ik.imagekit.io/2oajjadqkz/profile.jpg?updatedAt=1730618069252"
              alt="Aniket Pawar"
              width={16}
              height={16}
              className="mr-2 hidden rounded-full sm:inline"
            />
            Made in 🇮🇳 by Aniket Pawar
          </Link>
          <span>
            © {new Date().getFullYear()} Indian Quotes API.{" "}
            <span className="hidden sm:inline">
              Open-source under MIT License.
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
