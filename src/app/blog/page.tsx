import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog o napínaných stropech | Tipy, trendy, srovnání | StropDesign",
  description:
    "Praktické rady a tipy k napínaným stropům. Srovnání se sádrokartonem, výběr osvětlení, realizace v koupelně.",
  alternates: {
    canonical: "/blog",
    languages: { cs: "/blog", en: "/en/blog" },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Blog" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              Novinky a{" "}
              <em className="italic text-accent">inspirace</em>
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Praktické rady, trendy v interiérovém designu a vše, co potřebujete
              vědět o napínaných stropech.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-muted text-sm">
              Články se připravují. Navštivte nás znovu brzy!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <RevealOnScroll key={post.slug} delay={i * 80}>
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <article className="bg-white border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-300 h-full flex flex-col">
                      {/* Color header bar */}
                      <div className="h-2 bg-gradient-to-r from-accent to-accent-hover" />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Tags */}
                        <div className="flex flex-nowrap gap-2 mb-3 overflow-hidden">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] tracking-[0.08em] uppercase text-accent bg-accent-soft px-2 py-0.5 font-medium whitespace-nowrap shrink-0"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h2 className="font-display text-lg font-semibold text-heading mb-2 group-hover:text-accent transition-colors duration-300 leading-snug line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-body text-sm leading-[1.6] font-light mb-4 flex-1 line-clamp-3">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-muted mt-auto pt-4 border-t border-border">
                          <span>
                            {new Date(post.date).toLocaleDateString("cs-CZ", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
