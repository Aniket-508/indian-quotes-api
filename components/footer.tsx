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
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Documentation</h4>
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
            <h4 className="font-semibold text-gray-900 mb-4">More</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  className="hover:text-indigo-600"
                  href={`${ROUTES.CANNY}/feature-requests`}
                  target="_blank"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-indigo-600"
                  href={`${ROUTES.CANNY}/changelog`}
                  target="_blank"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-4 justify-between border-t border-gray-100 py-6 text-xs text-gray-600">
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
              className="rounded-full mr-2 hidden sm:inline"
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
