import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Metaversalwar - Play to Earn",
  description: "The Next Generation Web3 Gaming Ecosystem",

  applicationName: "Metaversal War",

  themeColor: "#1b1b1b",

  openGraph: {
    title: "Metaversal War",
    description: "The Next Generation Web3 Gaming Ecosystem",
    images: ["/MW.webp"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "icon.png",
    apple: "MW.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
