import React from "react";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-25 blur transition duration-1000 group-hover:opacity-40"></div>
      <div className="relative rounded-xl bg-gray-900 p-6">
        <div className="mb-4 flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F56]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-gray-300">
          {code}
        </pre>
      </div>
    </div>
  );
}
