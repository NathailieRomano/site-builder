import { Template } from "@/types";
import { themePresets } from "./theme";
import { generateId } from "./storage";

export const templates: Template[] = [
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Perfekt für Gastronomie-Betriebe — Speisekarte, Öffnungszeiten, Kontakt",
    category: "restaurant",
    thumbnail: "🍽️",
    theme: themePresets.restaurant,
    pages: [
      {
        name: "Startseite",
        slug: "/",
        data: {
          content: [
            {
              type: "Hero",
              props: {
                id: "hero-1",
                title: "Willkommen im Bella Italia",
                subtitle:
                  "Authentische italienische Küche im Herzen der Stadt. Frische Zutaten, traditionelle Rezepte.",
                ctaText: "Tisch reservieren",
                ctaLink: "#contact",
                bgColor: "#1c1917",
                textColor: "#ffffff",
                height: "large",
              },
            },
            {
              type: "Spacer",
              props: { id: "s1", height: 80 },
            },
            {
              type: "TextBlock",
              props: {
                id: "text-1",
                heading: "Unsere Geschichte",
                content:
                  "Seit 1985 steht Bella Italia für authentische italienische Küche. Unser Familienrezept aus Neapel bringen wir jeden Tag auf Ihren Teller — mit Liebe, Leidenschaft und den besten Zutaten der Region.",
                align: "center",
                size: "large",
              },
            },
            {
              type: "Spacer",
              props: { id: "s2", height: 60 },
            },
            {
              type: "Divider",
              props: { id: "d1", style: "solid", color: "#b45309" },
            },
            {
              type: "Spacer",
              props: { id: "s3", height: 60 },
            },
            {
              type: "TextBlock",
              props: {
                id: "text-2",
                heading: "Öffnungszeiten",
                content:
                  "Mo–Fr: 11:30–14:30 & 18:00–22:00 Uhr\nSa–So: 12:00–23:00 Uhr\nFeiertage: 12:00–22:00 Uhr",
                align: "center",
                size: "medium",
              },
            },
            {
              type: "Spacer",
              props: { id: "s4", height: 60 },
            },
            {
              type: "CTAButton",
              props: {
                id: "cta-1",
                text: "Online reservieren",
                link: "mailto:info@bella-italia.de",
                variant: "primary",
                size: "large",
                align: "center",
              },
            },
            {
              type: "Spacer",
              props: { id: "s5", height: 80 },
            },
            {
              type: "ContactForm",
              props: {
                id: "contact-1",
                heading: "Kontakt & Reservierung",
                subheading:
                  "Fragen zu Reservierungen oder Gruppenevents? Wir freuen uns auf Ihre Nachricht.",
                buttonText: "Anfrage senden",
              },
            },
            {
              type: "Spacer",
              props: { id: "s6", height: 60 },
            },
          ],
          root: { props: {} },
        },
      },
    ],
  },
  {
    id: "handwerker",
    name: "Handwerker",
    description: "Für Handwerksbetriebe — Leistungen, Referenzen, Kontaktformular",
    category: "handwerker",
    thumbnail: "🔨",
    theme: themePresets.handwerker,
    pages: [
      {
        name: "Startseite",
        slug: "/",
        data: {
          content: [
            {
              type: "Hero",
              props: {
                id: "hero-1",
                title: "Müller Elektrotechnik",
                subtitle:
                  "Ihr zuverlässiger Partner für Elektroinstallationen und Wartung. Über 20 Jahre Erfahrung — schnell, sauber, professionell.",
                ctaText: "Jetzt anfragen",
                ctaLink: "#contact",
                bgColor: "#1e3a5f",
                textColor: "#ffffff",
                height: "medium",
              },
            },
            {
              type: "Spacer",
              props: { id: "s1", height: 80 },
            },
            {
              type: "TextBlock",
              props: {
                id: "text-1",
                heading: "Unsere Leistungen",
                content:
                  "✓ Elektroinstallation Neubau & Sanierung\n✓ Smart Home Systeme\n✓ Photovoltaik & Ladestationen\n✓ Wartung & Notdienst 24/7\n✓ Beleuchtungsplanung",
                align: "left",
                size: "large",
              },
            },
            {
              type: "Spacer",
              props: { id: "s2", height: 60 },
            },
            {
              type: "Divider",
              props: { id: "d1", style: "solid", color: "#1e40af" },
            },
            {
              type: "Spacer",
              props: { id: "s3", height: 60 },
            },
            {
              type: "TextBlock",
              props: {
                id: "text-2",
                heading: "Warum Müller Elektrotechnik?",
                content:
                  "Wir arbeiten schnell, sauber und termingerecht. Alle unsere Arbeiten werden gemäß VDE-Normen ausgeführt und von unseren zertifizierten Elektrikern durchgeführt. Zufriedenheitsgarantie inklusive.",
                align: "center",
                size: "medium",
              },
            },
            {
              type: "Spacer",
              props: { id: "s4", height: 60 },
            },
            {
              type: "CTAButton",
              props: {
                id: "cta-1",
                text: "Kostenlos Angebot anfordern",
                link: "#contact",
                variant: "primary",
                size: "large",
                align: "center",
              },
            },
            {
              type: "Spacer",
              props: { id: "s5", height: 80 },
            },
            {
              type: "ContactForm",
              props: {
                id: "contact-1",
                heading: "Kontakt aufnehmen",
                subheading:
                  "Beschreiben Sie kurz Ihr Anliegen — wir melden uns innerhalb von 24 Stunden.",
                buttonText: "Anfrage senden",
              },
            },
            {
              type: "Spacer",
              props: { id: "s6", height: 60 },
            },
          ],
          root: { props: {} },
        },
      },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Für Kreative & Freelancer — Über mich, Projekte, Kontakt",
    category: "portfolio",
    thumbnail: "🎨",
    theme: themePresets.portfolio,
    pages: [
      {
        name: "Startseite",
        slug: "/",
        data: {
          content: [
            {
              type: "Hero",
              props: {
                id: "hero-1",
                title: "Hi, ich bin Sarah.",
                subtitle:
                  "UX Designerin & Creative Coder aus Berlin. Ich gestalte digitale Erlebnisse, die Menschen begeistern.",
                ctaText: "Projekte ansehen",
                ctaLink: "#gallery",
                bgColor: "#0f0f1a",
                textColor: "#f1f5f9",
                height: "fullscreen",
              },
            },
            {
              type: "Spacer",
              props: { id: "s1", height: 80 },
            },
            {
              type: "TextBlock",
              props: {
                id: "text-1",
                heading: "Über mich",
                content:
                  "5+ Jahre Erfahrung im UX & Product Design. Ich kombiniere aesthetisches Gespür mit technischem Know-how, um Interfaces zu bauen, die nicht nur schön aussehen — sondern auch funktionieren.",
                align: "center",
                size: "large",
              },
            },
            {
              type: "Spacer",
              props: { id: "s2", height: 60 },
            },
            {
              type: "Gallery",
              props: {
                id: "gallery-1",
                heading: "Ausgewählte Projekte",
                columns: 3,
                images: [
                  { url: "https://picsum.photos/seed/proj1/800/600", alt: "Projekt 1", caption: "E-Commerce Redesign" },
                  { url: "https://picsum.photos/seed/proj2/800/600", alt: "Projekt 2", caption: "Mobile App Design" },
                  { url: "https://picsum.photos/seed/proj3/800/600", alt: "Projekt 3", caption: "Brand Identity" },
                  { url: "https://picsum.photos/seed/proj4/800/600", alt: "Projekt 4", caption: "Dashboard UI" },
                  { url: "https://picsum.photos/seed/proj5/800/600", alt: "Projekt 5", caption: "Landing Page" },
                  { url: "https://picsum.photos/seed/proj6/800/600", alt: "Projekt 6", caption: "Design System" },
                ],
              },
            },
            {
              type: "Spacer",
              props: { id: "s3", height: 80 },
            },
            {
              type: "Divider",
              props: { id: "d1", style: "gradient", color: "#7c3aed" },
            },
            {
              type: "Spacer",
              props: { id: "s4", height: 80 },
            },
            {
              type: "CTAButton",
              props: {
                id: "cta-1",
                text: "Lass uns zusammenarbeiten ✨",
                link: "#contact",
                variant: "primary",
                size: "large",
                align: "center",
              },
            },
            {
              type: "Spacer",
              props: { id: "s5", height: 60 },
            },
            {
              type: "ContactForm",
              props: {
                id: "contact-1",
                heading: "Schreib mir",
                subheading: "Ich freue mich auf spannende Projekte und Kooperationen.",
                buttonText: "Nachricht senden",
              },
            },
            {
              type: "Spacer",
              props: { id: "s6", height: 60 },
            },
          ],
          root: { props: {} },
        },
      },
    ],
  },
];

export function applyTemplate(
  template: Template
): { theme: Template["theme"]; pages: { id: string; name: string; slug: string; data: Record<string, unknown> }[] } {
  return {
    theme: template.theme,
    pages: template.pages.map((p) => ({
      ...p,
      id: generateId(),
    })),
  };
}
