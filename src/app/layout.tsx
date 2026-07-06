import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Site Builder archiviert — Romano.Studio",
  description: "Der Site Builder Prototyp wurde archiviert und ist nicht mehr aktiv.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
