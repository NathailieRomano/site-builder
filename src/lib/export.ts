import type { SiteProject } from "@/types";
import { themeToCssVars } from "./theme";

/**
 * Generates a standalone HTML page for a single page of the project.
 */
function generatePageHtml(project: SiteProject, pageIndex: number): string {
  const page = project.pages[pageIndex];
  const theme = project.theme;
  const themeVars = themeToCssVars(theme);

  // Convert theme vars to CSS string
  const cssVarString = Object.entries(themeVars)
    .map(([key, val]) => `  ${key}: ${val};`)
    .join("\n");

  // Generate nav if multi-page
  const navHtml =
    project.pages.length > 1
      ? `<nav style="background:#111;padding:12px 24px;display:flex;gap:12px;align-items:center;">
      <span style="font-weight:700;color:#fff;margin-right:auto;">${project.name}</span>
      ${project.pages
        .map(
          (p, i) =>
            `<a href="${i === 0 ? "index.html" : p.slug.replace(/^\//, "") + ".html"}" style="color:${i === pageIndex ? "#818cf8" : "#999"};text-decoration:none;font-size:14px;">${p.name}</a>`
        )
        .join("\n      ")}
    </nav>`
      : "";

  // Render blocks to HTML
  const blocksHtml = renderBlocksToHtml(page.data, theme);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.name} — ${project.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Lato:wght@400;700&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
${cssVarString}
    }
    body {
      font-family: ${theme.fontFamily};
      background-color: ${theme.backgroundColor};
      color: ${theme.textColor};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    img { max-width: 100%; height: auto; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section { padding: 64px 24px; }
    .btn {
      display: inline-block;
      padding: 12px 32px;
      border-radius: ${theme.borderRadius};
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    @media (max-width: 768px) {
      .grid-2, .grid-3 { grid-template-columns: 1fr; }
    }
    /* FAQ */
    details { border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 8px; }
    details summary { padding: 16px 20px; cursor: pointer; font-weight: 500; }
    details[open] summary { border-bottom: 1px solid #e5e7eb; }
    details .answer { padding: 16px 20px; font-size: 14px; opacity: 0.75; }
  </style>
</head>
<body>
${navHtml}
${blocksHtml}
</body>
</html>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlocksToHtml(data: any, theme: SiteProject["theme"]): string {
  if (!data?.content || !Array.isArray(data.content)) return "";

  return data.content
    .map((block: { type: string; props: Record<string, unknown> }) => {
      const p = block.props || {};
      switch (block.type) {
        case "Hero":
          return `<section style="min-height:${p.height === "fullscreen" ? "100vh" : p.height === "large" ? "75vh" : "50vh"};display:flex;align-items:center;justify-content:center;background-color:${p.bgColor || "#0f172a"};${p.bgImage ? `background-image:url(${p.bgImage});background-size:cover;background-position:center;` : ""}color:${p.textColor || "#fff"};text-align:center;padding:96px 24px;">
  <div style="max-width:800px;">
    <h1 style="font-size:clamp(2rem,5vw,4rem);font-weight:700;font-family:${theme.headingFont};line-height:1.1;">${p.title || ""}</h1>
    ${p.subtitle ? `<p style="margin-top:24px;font-size:1.25rem;opacity:0.9;">${p.subtitle}</p>` : ""}
    ${p.ctaText && p.ctaLink ? `<div style="margin-top:40px;"><a href="${p.ctaLink}" class="btn" style="background:${theme.primaryColor};color:#fff;">${p.ctaText}</a></div>` : ""}
  </div>
</section>`;

        case "TextBlock":
          return `<section class="section" style="text-align:${p.align || "left"};">
  <div class="container" style="max-width:${p.size === "narrow" ? "640px" : p.size === "wide" ? "1000px" : "800px"};">
    ${p.heading ? `<h2 style="font-size:2rem;font-weight:700;margin-bottom:16px;font-family:${theme.headingFont};">${p.heading}</h2>` : ""}
    <p style="font-size:1rem;line-height:1.8;opacity:0.8;">${(p.content as string || "").replace(/\n/g, "<br>")}</p>
  </div>
</section>`;

        case "ImageBlock":
          return `<section class="section" style="text-align:${p.align || "center"};">
  <div class="container" style="max-width:${p.width === "small" ? "480px" : p.width === "full" ? "100%" : "800px"};">
    ${p.link ? `<a href="${p.link}">` : ""}
    <img src="${p.src || ""}" alt="${p.alt || ""}" style="border-radius:${p.rounded ? theme.borderRadius : "0"};width:100%;">
    ${p.link ? "</a>" : ""}
    ${p.caption ? `<p style="margin-top:8px;font-size:0.875rem;opacity:0.6;">${p.caption}</p>` : ""}
  </div>
</section>`;

        case "Gallery": {
          const images = (p.images as { src: string; alt: string }[]) || [];
          const cols = p.columns || "3";
          return `<section class="section">
  <div class="container">
    <div class="grid-${cols}">
      ${images.map((img) => `<img src="${img.src}" alt="${img.alt || ""}" style="border-radius:${theme.borderRadius};width:100%;aspect-ratio:1;object-fit:cover;">`).join("\n      ")}
    </div>
  </div>
</section>`;
        }

        case "CTAButton":
          return `<section style="padding:48px 24px;text-align:center;">
  <a href="${p.link || "#"}" class="btn" style="background:${p.variant === "outline" ? "transparent" : p.variant === "secondary" ? theme.secondaryColor : theme.primaryColor};color:${p.variant === "outline" ? theme.primaryColor : "#fff"};${p.variant === "outline" ? `border:2px solid ${theme.primaryColor};` : ""}font-size:${p.size === "large" ? "1.125rem" : p.size === "small" ? "0.8rem" : "1rem"};padding:${p.size === "large" ? "16px 40px" : p.size === "small" ? "8px 20px" : "12px 32px"};">${p.text || "Button"}</a>
</section>`;

        case "ContactForm":
          return `<section class="section" style="background:${p.bgColor || "transparent"};">
  <div class="container" style="max-width:640px;">
    ${p.heading ? `<h2 style="font-size:1.75rem;font-weight:700;text-align:center;margin-bottom:8px;font-family:${theme.headingFont};">${p.heading}</h2>` : ""}
    ${p.subtitle ? `<p style="text-align:center;opacity:0.7;margin-bottom:32px;">${p.subtitle}</p>` : ""}
    <form style="display:flex;flex-direction:column;gap:16px;">
      <input type="text" placeholder="Name" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:${theme.borderRadius};font-size:1rem;">
      <input type="email" placeholder="E-Mail" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:${theme.borderRadius};font-size:1rem;">
      <textarea rows="4" placeholder="Nachricht" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:${theme.borderRadius};font-size:1rem;resize:vertical;"></textarea>
      <button type="submit" class="btn" style="background:${theme.primaryColor};color:#fff;border:none;cursor:pointer;font-size:1rem;">${p.buttonText || "Senden"}</button>
    </form>
  </div>
</section>`;

        case "Testimonials": {
          const items = (p.items as { name: string; role: string; text: string; avatar: string }[]) || [];
          const tCols = p.columns === "2" ? "grid-2" : "grid-3";
          return `<section class="section">
  <div class="container">
    <div class="${tCols}">
      ${items
        .map(
          (item) => `<div style="padding:24px;${p.style === "cards" ? `border:1px solid #e5e7eb;border-radius:16px;background:#fff;` : `border-left:4px solid ${theme.primaryColor};padding-left:24px;`}">
        <p style="margin-bottom:16px;opacity:0.8;">&ldquo;${item.text}&rdquo;</p>
        <div style="display:flex;align-items:center;gap:12px;">
          ${item.avatar ? `<img src="${item.avatar}" alt="${item.name}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">` : ""}
          <div>
            <p style="font-weight:600;font-size:0.875rem;">${item.name}</p>
            ${item.role ? `<p style="font-size:0.75rem;opacity:0.6;">${item.role}</p>` : ""}
          </div>
        </div>
      </div>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>`;
        }

        case "FAQ": {
          const faqItems = (p.items as { question: string; answer: string }[]) || [];
          return `<section class="section">
  <div class="container" style="max-width:768px;">
    ${p.heading ? `<h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;font-family:${theme.headingFont};">${p.heading}</h2>` : ""}
    ${faqItems
      .map(
        (item) => `<details>
      <summary>${item.question}</summary>
      <div class="answer">${item.answer}</div>
    </details>`
      )
      .join("\n    ")}
  </div>
</section>`;
        }

        case "Video": {
          const embedUrl = getEmbedUrlExport(p.url as string);
          return `<section class="section">
  <div class="container" style="max-width:${p.maxWidth === "small" ? "576px" : p.maxWidth === "full" ? "1200px" : "768px"};">
    ${embedUrl ? `<div style="position:relative;padding-bottom:${p.aspectRatio === "4:3" ? "75%" : p.aspectRatio === "1:1" ? "100%" : "56.25%"};height:0;overflow:hidden;border-radius:12px;"><iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe></div>` : `<div style="background:#f3f4f6;border-radius:12px;padding:48px;text-align:center;color:#9ca3af;">Video-URL eingeben</div>`}
    ${p.caption ? `<p style="margin-top:12px;text-align:center;font-size:0.875rem;opacity:0.6;">${p.caption}</p>` : ""}
  </div>
</section>`;
        }

        case "Spacer":
          return `<div style="height:${p.height || "64"}px;"></div>`;

        case "Divider":
          return `<hr style="border:none;border-top:${p.thickness || "1"}px ${p.style || "solid"} ${p.color || "#e5e7eb"};max-width:${p.width === "small" ? "200px" : p.width === "full" ? "100%" : "600px"};margin:32px auto;">`;

        default:
          return `<!-- Unknown block: ${block.type} -->`;
      }
    })
    .join("\n");
}

function getEmbedUrlExport(url: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

/**
 * Export the entire project as a ZIP (uses JSZip via CDN or bundled).
 * Returns a Blob.
 */
export async function exportProjectAsZip(project: SiteProject): Promise<Blob> {
  // Dynamic import of JSZip
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // Generate HTML for each page
  project.pages.forEach((page, i) => {
    const filename = i === 0 ? "index.html" : page.slug.replace(/^\//, "") + ".html";
    const html = generatePageHtml(project, i);
    zip.file(filename, html);
  });

  // Add a readme
  zip.file(
    "README.md",
    `# ${project.name}\n\nExportiert am ${new Date().toLocaleDateString("de-DE")} mit Site Builder.\n\nÖffne index.html in deinem Browser oder lade die Dateien auf deinen Webhost hoch.\n`
  );

  return zip.generateAsync({ type: "blob" });
}
