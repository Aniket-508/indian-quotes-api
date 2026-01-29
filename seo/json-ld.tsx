import { LINK, SITE } from "@/constants";
import { getAllQuotes } from "@/lib/quotes-data";

const WebsiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.NAME,
    url: SITE.URL,
    description: SITE.DESCRIPTION.LONG,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.URL}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const SoftwareSourceCodeJsonLd = () => {
  const quotes = getAllQuotes();
  const uniqueCompanies = [
    ...new Set(quotes.map((q) => q.author.company.slug)),
  ];
  const uniqueAuthors = [...new Set(quotes.map((q) => q.author.slug))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: SITE.NAME,
    description: SITE.DESCRIPTION.LONG,
    url: SITE.URL,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ["TypeScript", "Next.js", "JavaScript"],
    runtimePlatform: "Node.js",
    license: LINK.LICENSE,
    author: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    maintainer: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    keywords: SITE.KEYWORDS,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    dateModified: new Date().toISOString().split("T")[0],
    numberOfItems: uniqueCompanies.length + uniqueAuthors.length,
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.NAME,
    url: SITE.URL,
    logo: `${SITE.URL}${SITE.OG_IMAGE}`,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    founder: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const BreadcrumbJsonLd = ({
  items,
}: {
  items: { name: string; url: string }[];
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const FAQJsonLd = () => {
  const faqs = [
    {
      question: "What is Indian Quotes API?",
      answer: `${SITE.NAME} is a free, open-source API that delivers curated quotes from India's most successful entrepreneurs. Access inspiring quotes from business leaders, founders, and visionaries.`,
    },
    {
      question: "How do I use the Indian Quotes API?",
      answer: `You can fetch quotes by making REST API calls to our endpoints. Get all quotes, filter by author or company, or fetch a random quote. Detailed documentation is available on our docs page.`,
    },
    {
      question: "Is the Indian Quotes API free to use?",
      answer: `Yes! ${SITE.NAME} is completely free and open-source under the MIT license. No authentication required. You can use it for personal and commercial projects.`,
    },
    {
      question: "What makes the Indian Quotes API unique?",
      answer: `${SITE.NAME} provides curated quotes specifically from Indian entrepreneurs and business leaders. Each quote includes author information, company details, and metadata for easy filtering and integration.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const JsonLdScripts = () => {
  return (
    <>
      <WebsiteJsonLd />
      <SoftwareSourceCodeJsonLd />
      <OrganizationJsonLd />
      <FAQJsonLd />
    </>
  );
};

export {
  JsonLdScripts,
  WebsiteJsonLd,
  SoftwareSourceCodeJsonLd,
  OrganizationJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
};
