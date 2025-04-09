import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProviders } from "../providers/ReactQueryProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi-Step Form",
  description: "A multi-step form with validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ReactQueryProviders>
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  );
}