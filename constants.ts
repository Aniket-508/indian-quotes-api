const SITE = {
  NAME: "Indian Quotes API",
  URL: `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
  OG_IMAGE:
    "https://ik.imagekit.io/2oajjadqkz/1731074413647.jpg?updatedAt=1731074450615",
  AUTHOR: {
    NAME: "Aniket Pawar",
    TWITTER: "@alaymanguy",
    GITHUB: "Aniket-508",
  },
  DESCRIPTION: {
    LONG: "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
    SHORT:
      "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
  },
  KEYWORDS: [
    "Indian Quotes API",
    "Quotes API",
    "Free Quotes API",
    "Entrepreneur Quotes",
    "Inspirational Quotes",
    "Motivational Quotes",
    "Famous Indian Quotes",
    "Startup Quotes",
    "Business Quotes",
    "Leadership Quotes",
    "Success Quotes",
    "Open Source API",
    "Quotes for Developers",
    "Quotes for Startups",
    "Quotes for Entrepreneurs",
    "Quotes for Motivation",
    "Quotes for Inspiration",
    "Quotes for Business",
    "Quotes for Leadership",
    "Quotes for Success",
  ],
} as const;

const LINK = {
  TWITTER: `https://x.com/${SITE.AUTHOR.TWITTER}`,
  GITHUB: `https://github.com/${SITE.AUTHOR.GITHUB}/indian-quotes-api`,
  LICENSE: `https://github.com/${SITE.AUTHOR.GITHUB}/indian-quotes-api/blob/main/LICENSE`,
  SPONSOR: `https://github.com/sponsors/${SITE.AUTHOR.GITHUB}`,
  CANNY: "https://indian-quotes-api.canny.io",
  PEERLIST: "https://peerlist.io/aniket_pawar/project/indian-quotes-api",
} as const;

export { LINK, SITE };
