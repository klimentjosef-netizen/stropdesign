import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import SectionEyebrow from "@/components/SectionEyebrow";
import BlogContent from "@/components/BlogContent";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Článek nenalezen" };

  return {
    title: `${post.title} | StropDesign Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      {/* Header */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[12px] text-muted hover:text-accent tracking-[0.06em] uppercase mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zpět na blog
          </Link>

          <SectionEyebrow text="Blog" />

          <h1 className="font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] mb-6 text-heading">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted">
            <span>
              {new Date(post.date).toLocaleDateString("cs-CZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="w-1 h-1 bg-muted rounded-full" />
            <span>{post.readingTime}</span>
            <span className="w-1 h-1 bg-muted rounded-full" />
            <span>{post.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.08em] uppercase text-accent bg-accent-soft px-2.5 py-1 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <BlogContent content={post.content} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-light-secondary border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[clamp(22px,3vw,32px)] font-semibold mb-4 text-heading">
            Zaujal vás napínaný strop?
          </h2>
          <p className="text-body text-sm leading-[1.7] font-light mb-8">
            Ozvěte se nám pro nezávaznou konzultaci a cenovou nabídku na míru.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-sm"
          >
            Nezávazná poptávka
          </Link>
        </div>
      </section>
    </>
  );
}
