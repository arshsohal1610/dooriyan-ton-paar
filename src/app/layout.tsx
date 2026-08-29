import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doorian Ton Paar",
  description: "A Rakhi journey that brings hearts closer, no matter the distance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}