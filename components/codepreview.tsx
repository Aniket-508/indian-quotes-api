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
const response = await fetch('https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/quotes/random');
const data = await response.json();

console.log(data);
/* Output:
{
  "id": 1,
  "created_at": "2024-11-03T18:17:23.851778+00:00",
  "quote": "If there is doubt, there is no doubt.",
  "tags": [
    "mindset"
  ],
  "author_id": 1,
  "author": {
    "id": 1,
    "img": "https://media.licdn.com/dms/image/v2/C4D03AQGutmmcvCLUvw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632475772897?e=1736380800&v=beta&t=fZ1joSw_nh5Q5t80xTWxw8dT8zMTANYSGG4FP1uLOuI",
    "url": "https://www.linkedin.com/in/sachinbansal/",
    "name": "Sachin Bansal",
    "company": {
      "id": 1,
      "url": "https://www.flipkart.com/",
      "name": "Flipkart",
      "created_at": "2024-11-03T18:19:00.732254+00:00"
    },
    "company_id": 1,
    "created_at": "2024-11-03T17:37:46.864463+00:00"
  }
}
*/`}
        </pre>
      </div>
    </div>
  );
}
