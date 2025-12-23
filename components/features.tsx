import type { LucideIcon } from "lucide-react";
import { BookOpen, Database, Globe, Lock } from "lucide-react";

const featureItems = [
  {
    title: "100+ Curated Quotes",
    description: "Access an extensive collection of verified quotes.",
    icon: Database,
    iconColor: "text-indigo-400",
    size: "medium",
  },
  {
    title: "Global CDN",
    description: "Lightning-fast response times with edge caching worldwide.",
    icon: Globe,
    iconColor: "text-blue-400",
    size: "medium",
  },
  {
    title: "No API Key Required",
    description:
      "Free and open access with no registration or API key required.",
    icon: Lock,
    iconColor: "text-emerald-400",
    size: "medium",
  },
  {
    title: "Comprehensive Docs",
    description: "Detailed documentation with examples and usage guidelines.",
    icon: BookOpen,
    iconColor: "text-orange-400",
    size: "medium",
  },
] as const;

const sizes = {
  small: "col-span-1",
  medium: "col-span-2",
  large: "col-span-2 row-span-2",
} as const;

const iconSizes = {
  small: "w-8 h-8",
  medium: "w-8 h-8",
  large: "w-10 h-10",
} as const;

const titleSizes = {
  small: "text-lg",
  medium: "text-xl",
  large: "text-2xl",
} as const;

interface FeatureItemProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  iconColor: string;
  size?: "small" | "medium" | "large";
}

const FeatureItem = ({
  title,
  description,
  icon: Icon,
  iconColor,
  size = "small",
}: FeatureItemProps) => {
  return (
    <div
      className={`group/features relative ${sizes[size]} overflow-hidden rounded-xl border border-gray-100 bg-white p-6 transition-all duration-500 hover:border-transparent hover:shadow-xl`}
    >
      <div className="transition duration-200 group-hover/features:translate-x-2">
        <Icon className={`${iconSizes[size]} ${iconColor} mb-3`} />
        <h3 className={`${titleSizes[size]} mb-2 font-bold text-gray-900`}>
          {title}
        </h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {featureItems.map((item) => (
          <FeatureItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
