import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "Aztec dApp",
  description: "Aztec dApp with Noir smart contracts",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
