import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button className="bg-indigo-600 hover:bg-indigo-700" size="lg" asChild>
          <Link href={ROUTES.HOME}>Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
