"use client";

import React from "react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug: string;
  category: string;
}

interface BlogListProps {
  heading: string;
  posts: BlogPost[];
  layout: "grid" | "list" | "featured";
  columns: "2" | "3";
  showDate: boolean;
  showAuthor: boolean;
  showCategory: boolean;
  showImage: boolean;
}

export function BlogList({ heading, posts, layout = "grid", columns = "2", showDate, showAuthor, showCategory, showImage }: BlogListProps) {
  const gridCols = columns === "3" ? "md:grid-cols-3" : "md:grid-cols-2";

  if (layout === "featured" && posts.length > 0) {
    const [featured, ...rest] = posts;
    return (
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          {heading && <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--theme-heading-font)" }}>{heading}</h2>}
          
          {/* Featured Post */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 mb-8" style={{ borderRadius: "var(--theme-radius)" }}>
            {showImage && featured.image && (
              <img src={featured.image} alt={featured.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                {showCategory && featured.category && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--theme-primary)", color: "#fff" }}>{featured.category}</span>
                )}
                {showDate && <span className="text-xs opacity-60">{featured.date}</span>}
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--theme-heading-font)" }}>{featured.title}</h3>
              <p className="opacity-70 mb-3">{featured.excerpt}</p>
              {showAuthor && featured.author && <p className="text-sm opacity-50">Von {featured.author}</p>}
            </div>
          </div>

          {rest.length > 0 && (
            <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
              {rest.map((post, i) => <PostCard key={i} post={post} showDate={showDate} showAuthor={showAuthor} showCategory={showCategory} showImage={showImage} />)}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        {heading && <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--theme-heading-font)" }}>{heading}</h2>}
        
        {layout === "list" ? (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <div key={i} className="flex gap-6 items-start border-b border-gray-100 pb-6">
                {showImage && post.image && (
                  <img src={post.image} alt={post.title} className="w-32 h-24 rounded-lg object-cover flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {showCategory && post.category && <span className="text-xs font-medium opacity-60">{post.category}</span>}
                    {showDate && <span className="text-xs opacity-40">{post.date}</span>}
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--theme-heading-font)" }}>{post.title}</h3>
                  <p className="text-sm opacity-70 line-clamp-2">{post.excerpt}</p>
                  {showAuthor && post.author && <p className="text-xs opacity-50 mt-2">Von {post.author}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
            {posts.map((post, i) => <PostCard key={i} post={post} showDate={showDate} showAuthor={showAuthor} showCategory={showCategory} showImage={showImage} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function PostCard({ post, showDate, showAuthor, showCategory, showImage }: { post: BlogPost; showDate: boolean; showAuthor: boolean; showCategory: boolean; showImage: boolean }) {
  return (
    <article className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow" style={{ borderRadius: "var(--theme-radius)" }}>
      {showImage && post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {showCategory && post.category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--theme-primary)", color: "#fff", opacity: 0.9 }}>{post.category}</span>
          )}
          {showDate && <span className="text-xs opacity-50">{post.date}</span>}
        </div>
        <h3 className="font-semibold mb-2" style={{ fontFamily: "var(--theme-heading-font)" }}>{post.title}</h3>
        <p className="text-sm opacity-70 line-clamp-3">{post.excerpt}</p>
        {showAuthor && post.author && <p className="text-xs opacity-50 mt-3">Von {post.author}</p>}
      </div>
    </article>
  );
}

export const BlogListConfig = {
  label: "Blog / Artikel",
  fields: {
    heading: { type: "text" as const, label: "Überschrift" },
    layout: {
      type: "select" as const,
      label: "Layout",
      options: [
        { value: "grid", label: "Raster" },
        { value: "list", label: "Liste" },
        { value: "featured", label: "Featured (erster gross)" },
      ],
    },
    columns: {
      type: "radio" as const,
      label: "Spalten (Raster)",
      options: [{ value: "2", label: "2" }, { value: "3", label: "3" }],
    },
    showImage: { type: "radio" as const, label: "Bilder zeigen", options: [{ value: true, label: "Ja" }, { value: false, label: "Nein" }] },
    showDate: { type: "radio" as const, label: "Datum zeigen", options: [{ value: true, label: "Ja" }, { value: false, label: "Nein" }] },
    showAuthor: { type: "radio" as const, label: "Autor zeigen", options: [{ value: true, label: "Ja" }, { value: false, label: "Nein" }] },
    showCategory: { type: "radio" as const, label: "Kategorie zeigen", options: [{ value: true, label: "Ja" }, { value: false, label: "Nein" }] },
    posts: {
      type: "array" as const,
      label: "Artikel",
      arrayFields: {
        title: { type: "text" as const, label: "Titel" },
        excerpt: { type: "textarea" as const, label: "Auszug" },
        date: { type: "text" as const, label: "Datum" },
        author: { type: "text" as const, label: "Autor" },
        category: { type: "text" as const, label: "Kategorie" },
        image: { type: "text" as const, label: "Bild URL" },
        slug: { type: "text" as const, label: "URL-Slug" },
      },
    },
  },
  defaultProps: {
    heading: "Aktuelles",
    layout: "grid" as const,
    columns: "2" as const,
    showImage: true,
    showDate: true,
    showAuthor: true,
    showCategory: true,
    posts: [
      { title: "Neue Website für Bäckerei Müller", excerpt: "Wir freuen uns, die neue Website für die Bäckerei Müller vorzustellen. Modern, schnell und mit Online-Bestellsystem.", date: "15. Feb 2026", author: "Team", category: "Projekte", image: "https://picsum.photos/seed/blog1/600/400", slug: "baeckerei-mueller" },
      { title: "5 Tipps für bessere Ladezeiten", excerpt: "Schnelle Websites sind wichtig für SEO und User Experience. Hier sind unsere Top-Tipps für eine optimierte Performance.", date: "10. Feb 2026", author: "Team", category: "Tipps", image: "https://picsum.photos/seed/blog2/600/400", slug: "ladezeiten-tipps" },
      { title: "Warum responsive Design unverzichtbar ist", excerpt: "Mehr als 60% aller Website-Besuche kommen von Mobilgeräten. So stellen Sie sicher, dass Ihre Seite überall perfekt aussieht.", date: "5. Feb 2026", author: "Team", category: "Design", image: "https://picsum.photos/seed/blog3/600/400", slug: "responsive-design" },
    ],
  },
  render: BlogList,
};
