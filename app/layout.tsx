import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { geistSans, geistMono, bricolage } from "@/lib/fonts";
import { MAIN_METADATA } from "@/lib/meta";
import "./globals.css";

export const metadata: Metadata = {
  title: MAIN_METADATA.TITLE,
  description: MAIN_METADATA.DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: MAIN_METADATA.SITE_NAME,
    url: MAIN_METADATA.URL,
    title: MAIN_METADATA.TITLE,
    description: MAIN_METADATA.DESCRIPTION,
    images: MAIN_METADATA.IMAGE,
  },
  twitter: {
    card: "summary",
    title: MAIN_METADATA.TITLE,
    description: MAIN_METADATA.DESCRIPTION,
    images: MAIN_METADATA.IMAGE,
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
        <Toaster richColors />
      </body>
    </html>
  );
}
