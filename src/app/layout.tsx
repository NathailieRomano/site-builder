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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Lato:wght@400;700&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
