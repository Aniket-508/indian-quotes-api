import Link from "next/link";
import { Quote } from "lucide-react";

import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      className={cn("flex items-center space-x-2", className)}
      href={ROUTES.HOME}
    >
      <Quote className="size-5 text-indigo-600" />
      <span className="text-lg font-semibold text-gray-900">
        Indian Quotes API
      </span>
    </Link>
  );
}
