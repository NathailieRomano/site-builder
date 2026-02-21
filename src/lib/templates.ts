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
  {
    id: "verein",
    name: "Verein",
    description: "Für Sportvereine, Kulturvereine und Organisationen — Events, Team, Kontakt",
    category: "restaurant" as const,
    thumbnail: "⚽",
    theme: themePresets.verein,
    pages: [
      {
        name: "Startseite",
        slug: "/",
        data: {
          content: [
            { type: "Navigation", props: { id: "nav-1", logo: "FC Musterverein", links: [{ label: "Home", href: "#" }, { label: "Über uns", href: "#about" }, { label: "Termine", href: "#events" }, { label: "Kontakt", href: "#contact" }], bgColor: "#059669", textColor: "#ffffff", sticky: true, style: "minimal" } },
            { type: "Hero", props: { id: "hero-1", title: "Willkommen beim FC Musterverein", subtitle: "Seit 1985 — Gemeinschaft, Sport und Spass für alle Altersgruppen.", ctaText: "Mitglied werden", ctaLink: "#contact", bgColor: "#064e3b", textColor: "#ffffff", height: "large" } },
            { type: "TextBlock", props: { id: "about-1", heading: "Über unseren Verein", content: "Wir sind ein aktiver Verein mit über 200 Mitgliedern. Bei uns steht der Teamgeist im Vordergrund — ob jung oder alt, Anfänger oder Profi. Komm vorbei und werde Teil unserer Gemeinschaft!", align: "center", size: "medium" } },
            { type: "Testimonials", props: { id: "test-1", items: [{ name: "Laura M.", role: "Mitglied seit 2019", text: "Der beste Verein der Region! Tolle Leute und super Trainings.", avatar: "" }, { name: "Marco K.", role: "Jugendtrainer", text: "Hier wird Nachwuchsförderung noch gross geschrieben.", avatar: "" }, { name: "Silvia B.", role: "Vorstandsmitglied", text: "Ehrenamtlich dabei zu sein macht hier richtig Spass!", avatar: "" }], columns: "3", style: "cards" } },
            { type: "FAQ", props: { id: "faq-1", heading: "Häufige Fragen", items: [{ question: "Wie werde ich Mitglied?", answer: "Fülle einfach unser Kontaktformular aus oder komm an einem Trainingsabend vorbei." }, { question: "Was kostet die Mitgliedschaft?", answer: "Erwachsene CHF 120/Jahr, Jugendliche CHF 60/Jahr, Familien CHF 200/Jahr." }, { question: "Wann sind die Trainingszeiten?", answer: "Dienstag und Donnerstag 18:30-20:00, Samstag 10:00-12:00." }], style: "bordered" } },
            { type: "SocialLinks", props: { id: "social-1", links: [{ platform: "instagram", url: "https://instagram.com/" }, { platform: "facebook", url: "https://facebook.com/" }, { platform: "email", url: "info@fcmuster.ch" }], size: "medium", align: "center", style: "pills" } },
            { type: "ContactForm", props: { id: "contact-1", heading: "Kontaktiere uns", subheading: "Fragen? Interesse? Schreib uns!", buttonText: "Nachricht senden" } },
            { type: "Footer", props: { id: "footer-1", companyName: "FC Musterverein", tagline: "Seit 1985 — Sport verbindet.", links: [{ label: "Impressum", href: "#" }, { label: "Datenschutz", href: "#" }], bgColor: "#064e3b", textColor: "#d1fae5", showCopyright: true } },
          ],
          root: { props: {} },
        },
      },
    ],
  },
  {
    id: "coiffeur",
    name: "Coiffeur / Salon",
    description: "Für Coiffeure, Beauty-Salons und Wellness — Leistungen, Preise, Öffnungszeiten",
    category: "restaurant" as const,
    thumbnail: "💇",
    theme: themePresets.coiffeur,
    pages: [
      {
        name: "Startseite",
        slug: "/",
        data: {
          content: [
            { type: "Navigation", props: { id: "nav-1", logo: "Salon Elegance", links: [{ label: "Home", href: "#" }, { label: "Leistungen", href: "#services" }, { label: "Öffnungszeiten", href: "#hours" }, { label: "Kontakt", href: "#contact" }], bgColor: "#fdf2f8", textColor: "#1e1b2e", sticky: true, style: "centered" } },
            { type: "Hero", props: { id: "hero-1", title: "Ihr Salon für Stil & Wohlbefinden", subtitle: "Professionelle Haarschnitte, Colorationen und Styling — in entspannter Atmosphäre.", ctaText: "Termin buchen", ctaLink: "#contact", bgColor: "#831843", textColor: "#fdf2f8", height: "large" } },
            { type: "TextBlock", props: { id: "services-1", heading: "Unsere Leistungen", content: "✂️ Haarschnitt Damen ab CHF 65\n✂️ Haarschnitt Herren ab CHF 45\n🎨 Coloration ab CHF 85\n💆 Kopfmassage CHF 25\n👰 Hochzeits-Styling ab CHF 150\n💅 Maniküre CHF 45", align: "center", size: "medium" } },
            { type: "Gallery", props: { id: "gallery-1", images: [{ src: "https://picsum.photos/seed/salon1/600/600", alt: "Salon 1" }, { src: "https://picsum.photos/seed/salon2/600/600", alt: "Salon 2" }, { src: "https://picsum.photos/seed/salon3/600/600", alt: "Salon 3" }, { src: "https://picsum.photos/seed/salon4/600/600", alt: "Salon 4" }], columns: "2", gap: "medium" } },
            { type: "OpeningHours", props: { id: "hours-1", heading: "Öffnungszeiten", days: [{ day: "Montag", hours: "Geschlossen" }, { day: "Dienstag", hours: "09:00 – 18:00" }, { day: "Mittwoch", hours: "09:00 – 18:00" }, { day: "Donnerstag", hours: "09:00 – 20:00" }, { day: "Freitag", hours: "09:00 – 18:00" }, { day: "Samstag", hours: "08:00 – 16:00" }, { day: "Sonntag", hours: "Geschlossen" }], note: "Termine nach Vereinbarung auch ausserhalb der Öffnungszeiten.", style: "cards" } },
            { type: "Testimonials", props: { id: "test-1", items: [{ name: "Nina R.", role: "Stammkundin", text: "Der beste Salon in der Stadt! Immer top Beratung und wunderschöne Ergebnisse.", avatar: "" }, { name: "Claudia M.", role: "", text: "Endlich ein Coiffeur der zuhört. Ich bin seit 3 Jahren hier und will nie wieder woanders hin.", avatar: "" }], columns: "2", style: "minimal" } },
            { type: "GoogleMap", props: { id: "map-1", address: "Bern Altstadt, Schweiz", height: "medium", rounded: true, caption: "Salon Elegance — Mitten in der Altstadt" } },
            { type: "ContactForm", props: { id: "contact-1", heading: "Termin vereinbaren", subheading: "Rufen Sie uns an oder schreiben Sie uns — wir freuen uns auf Sie!", buttonText: "Anfrage senden", showPhone: true } },
            { type: "Footer", props: { id: "footer-1", companyName: "Salon Elegance", tagline: "Ihr Haar in besten Händen.", links: [{ label: "Instagram", href: "#" }, { label: "Impressum", href: "#" }], bgColor: "#1e1b2e", textColor: "#f9a8d4", showCopyright: true } },
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
