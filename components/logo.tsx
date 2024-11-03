import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Quote className="w-6 h-6 text-indigo-600" />
      <span className="text-lg font-semibold text-gray-900">
        IndianQuotesAPI
      </span>
    </div>
  );
}
