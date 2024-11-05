import CodeBlock from "./ui/codeblock";
import { API_ROUTES } from "@/lib/routes";
import { API_JSON_OUTPUT } from "@/lib/code";

export default function CodePreview() {
  return (
    <CodeBlock
      code={`// Fetch a random quote
const response = await fetch('https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api${API_ROUTES.QUOTES}${API_ROUTES.RANDOM}');
const data = await response.json();

console.log(data);
/* Output:
${API_JSON_OUTPUT}
*/`}
    />
  );
}
