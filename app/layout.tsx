import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "IndianQuotesAPI",
  description:
    "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
  openGraph: {
    type: "website",
    url: "https://indian-quotes-api.vercel.app/",
    title: "IndianQuotesAPI",
    description:
      "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
    images:
      "https://ik.imagekit.io/2oajjadqkz/portfolio-image.png?updatedAt=1708090929752",
  },
  twitter: {
    card: "summary",
    title: "IndianQuotesAPI",
    description:
      "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
    images:
      "https://ik.imagekit.io/2oajjadqkz/portfolio-image.png?updatedAt=1708090929752",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
