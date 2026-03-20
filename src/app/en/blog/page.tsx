import { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionEyebrow from "@/components/SectionEyebrow";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | StropDesign",
  description:
    "Articles, tips and news about stretch ceilings. We help you choose the right surface, lighting, and maintenance.",
  alternates: {
    canonical: "/en/blog",
    languages: { cs: "/blog", en: "/en/blog" },
  },
};

export default function BlogPageEN() {
  const posts = getAllPosts("en");

  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionEyebrow text="Blog" />
            <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] mb-6 text-heading">
              News and{" "}
              <em className="italic text-accent">inspiration</em>
            </h1>
            <p className="text-body text-[15px] leading-[1.75] font-light max-w-xl">
              Practical tips, interior design trends, and everything you need to
              know about stretch ceilings.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-light-secondary">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-muted text-sm">
              Articles are being prepared. Visit us again soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <RevealOnScroll key={post.slug} delay={i * 80}>
                  <Link href={`/en/blog/${post.slug}`} className="block group">
                    <article className="bg-white border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-300 h-full flex flex-col">
                      <div className="h-2 bg-gradient-to-r from-accent to-accent-hover" />
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] tracking-[0.08em] uppercase text-accent bg-accent-soft px-2 py-0.5 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="font-display text-lg font-semibold text-heading mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-body text-sm leading-[1.6] font-light mb-4 flex-1">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-muted mt-auto pt-4 border-t border-border">
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
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
