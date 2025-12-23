"use client";

import { useState } from "react";
import HTTPSnippet from "httpsnippet";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CodegenDefinitions } from "@/lib/code";
import { API_BASE_URL } from "@/lib/routes";

interface CodeGenModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    method: string;
    url: string;
    pathParams?: Record<string, string | number>;
    queryParams?: Record<string, string | number>;
    headers?: Record<string, string>;
    body?: unknown;
  };
}

export default function CodeGenModal({
  isOpen,
  onClose,
  request,
}: CodeGenModalProps) {
  const [selectedDefinition, setSelectedDefinition] = useState(
    CodegenDefinitions[24]
  );

  const getFormattedUrl = () => {
    let url = request.url;

    // Replace path params
    if (request.pathParams) {
      Object.entries(request.pathParams).forEach(([key, value]) => {
        url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
      });
    }

    // Handle query params
    const urlObject = new URL(url, API_BASE_URL);
    if (request.queryParams) {
      Object.entries(request.queryParams).forEach(([key, value]) => {
        urlObject.searchParams.append(key, String(value));
      });
    }

    // Return the full path without the base URL
    return urlObject.pathname + urlObject.search;
  };

  const formattedUrl = getFormattedUrl();

  // @ts-expect-error httpsnippet
  const snippet = new HTTPSnippet({
    method: request.method,
    url: `${API_BASE_URL}${formattedUrl}`,
    headers: Object.entries(request.headers || {}).map(([key, value]) => ({
      name: key,
      value,
    })),
    postData: request.body
      ? { mimeType: "application/json", text: JSON.stringify(request.body) }
      : undefined,
  });

  const options = { indent: " " };

  const code =
    snippet.convert(
      selectedDefinition.lang,
      selectedDefinition.mode,
      options
    ) || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "code.txt";
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Generate Code</DialogTitle>
          <DialogDescription>
            Select a language to generate code for.
          </DialogDescription>
        </DialogHeader>
        <Select
          value={selectedDefinition.caption}
          onValueChange={(value) =>
            setSelectedDefinition(
              CodegenDefinitions.find((def) => def.caption === value)!
            )
          }
        >
          <SelectTrigger>{selectedDefinition.caption}</SelectTrigger>
          <SelectContent>
            {CodegenDefinitions.map((def) => (
              <SelectItem key={def.name} value={def.caption}>
                {def.caption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border border-gray-200">
          <p className="px-4 py-2 text-sm text-gray-500">Generated code</p>
          <div className="border-t border-gray-200 px-4 py-2">
            <code className="whitespace-pre-line text-xs font-semibold">
              {code}
            </code>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleCopy}
          >
            <Copy className="mr-2" />
            Copy
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
