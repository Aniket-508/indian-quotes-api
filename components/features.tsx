import { Database, Code, Lock, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-500"></div>
      <div className="relative bg-white rounded-xl p-8 border border-gray-100 hover:border-transparent transition duration-500">
        <Icon className="w-10 h-10 text-indigo-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <>
      <FeatureCard
        icon={Database}
        title="5000+ Quotes"
        description="Extensive collection of verified quotes from India's most successful entrepreneurs"
      />
      {/* <FeatureCard
        icon={Globe}
        title="Global CDN"
        description="Lightning-fast response times with edge caching worldwide"
      /> */}
      <FeatureCard
        icon={Code}
        title="Simple Integration"
        description="Clean, RESTful API with comprehensive documentation"
      />
      <FeatureCard
        icon={Lock}
        title="No API Key"
        description="Free and open access. No registration or API key required"
      />
      {/* <FeatureCard
        icon={Cpu}
        title="99.9% Uptime"
        description="Enterprise-grade reliability you can count on"
      /> */}
      {/* <FeatureCard
            icon={Zap}
            title="Real-time Updates"
            description="New quotes added regularly from verified sources"
          /> */}
    </>
  );
}
