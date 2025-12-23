import { API_JSON_OUTPUT } from "@/lib/code";
import { API_BASE_URL, API_ROUTES } from "@/lib/routes";
import CodeBlock from "./ui/codeblock";

export default function CodePreview() {
  return (
    <CodeBlock
      code={`// Fetch a random quote
const response = await fetch('${API_BASE_URL}${API_ROUTES.QUOTES}${API_ROUTES.RANDOM}');
const data = await response.json();

console.log(data);
/* Output:
${API_JSON_OUTPUT}
*/`}
    />
  );
}
