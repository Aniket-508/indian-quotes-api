export const ROUTES = {
  HOME: "/",
  DOCS: "/docs",
  RANDOM: "/random",
  AUTHOR: "/author",
  COMPANY: "/company",
  QUICKSTART: "quickstart",
  FEATURES: "features",
  GITHUB: "https://github.com/Aniket-508/indian-quotes-api",
  CANNY: "https://indian-quotes-api.canny.io",
  PEERLIST_PROJECT:
    "https://peerlist.io/aniket_pawar/project/indian-quotes-api",
};

export const API_ROUTES = {
  QUOTES: "/quotes",
  RANDOM: "/random",
};

export const BASE_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;

export const API_BASE_URL = `${BASE_URL}/api`;
