import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Site Builder — Websites ohne Code erstellen",
  description:
    "Erstellen Sie professionelle Websites per Drag & Drop — für Restaurants, Handwerker, Portfolio und mehr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
