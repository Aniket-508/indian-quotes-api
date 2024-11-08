import { Database, Globe, Lock, BookOpen, LucideIcon } from "lucide-react";

const featureItems = [
  {
    title: "5000+ Curated Quotes",
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
      className={`relative group/features ${sizes[size]} bg-white p-6 rounded-xl border border-gray-100 overflow-hidden hover:border-transparent hover:shadow-xl transition-all duration-500`}
    >
      <div className="group-hover/features:translate-x-2 transition duration-200">
        <Icon className={`${iconSizes[size]} ${iconColor} mb-3`} />
        <h3 className={`${titleSizes[size]} font-bold text-gray-900 mb-2`}>
          {title}
        </h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {featureItems.map((item) => (
          <FeatureItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
