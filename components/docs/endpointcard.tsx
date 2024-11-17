"use client";

import { useState } from "react";
import { CodeXml } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import CodeBlock from "../ui/codeblock";
import FieldList from "./fieldlist";
import CodeGenModal from "../codegenmodal";

export default function EndpointCard({
  method,
  route,
  description,
  pathParams,
  queryParams,
  exampleCode,
  examplePathParams,
  exampleQueryParams,
}: {
  method: string;
  route: string;
  description: string;
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number>;
  exampleCode: string;
  examplePathParams?: Record<string, string | number>;
  exampleQueryParams?: Record<string, string | number>;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Badge size="lg" className="bg-green-100 text-green-700">
            {method}
          </Badge>
          <code className="text-lg text-gray-900">{route}</code>
        </div>
        <Button variant="ghost" onClick={() => setModalOpen(true)}>
          <CodeXml />
          Show Code
        </Button>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>

      {queryParams && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Query Parameters</h4>
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
