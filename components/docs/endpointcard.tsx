"use client";

import { useState } from "react";
import { CodeXml } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import CodeBlock from "../ui/codeblock";
import CodeGenModal from "./codegenmodal";
import FieldList from "./fieldlist";

export default function EndpointCard({
  method,
  route,
  description,
  queryParams,
  exampleCode,
  examplePathParams,
  exampleQueryParams,
}: {
  method: string;
  route: string;
  description: string;
  queryParams?: Record<string, string | number>;
  exampleCode: string;
  examplePathParams?: Record<string, string | number>;
  exampleQueryParams?: Record<string, string | number>;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge size="lg" className="bg-green-100 text-green-700">
            {method}
          </Badge>
          <code className="text-sm text-gray-900 sm:text-base md:text-lg">
            {route}
          </code>
        </div>
        <Button
          variant="ghost"
          className="hidden md:inline-flex"
          onClick={() => setModalOpen(true)}
        >
          <CodeXml />
          Show Code
        </Button>
        <Button
          variant="ghost"
          className="inline-flex md:hidden"
          onClick={() => setModalOpen(true)}
        >
          <CodeXml />
          Code
        </Button>
      </div>
      <p className="mb-4 text-gray-600">{description}</p>

      {queryParams && (
        <div className="mb-4">
          <h4 className="mb-2 font-semibold text-gray-900">Query Parameters</h4>
          <FieldList fields={queryParams} />
        </div>
      )}

      <CodeBlock code={exampleCode} />

      <CodeGenModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        request={{
          method,
          url: route,
          headers: {},
          body: {},
          pathParams: examplePathParams,
          queryParams: exampleQueryParams,
        }}
      />
    </div>
  );
}
