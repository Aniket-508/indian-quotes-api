"use client";

export default function CodePreview() {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative bg-gray-900 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
          {`// Fetch a random quote
const response = await fetch('https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/quotes');
const data = await response.json();

console.log(data);
/* Output:
{
  "quote": "None can destroy iron, but its own rust can. Likewise, none can destroy a person, but their own mindset can.",
  "author": "Ratan Tata",
  "author_image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Ratan_Tata_2011_%28The_TCS_Story_Launch_-_CII%29_%28cropped%29.jpg",
  "author_url": "https://en.wikipedia.org/wiki/Ratan_Tata",
  "company": "Tata Group",
  "company_url"": "https://en.wikipedia.org/wiki/Tata_Group",
  "tags": ["personal", "mindset"],
}
*/`}
        </pre>
      </div>
    </div>
  );
}
