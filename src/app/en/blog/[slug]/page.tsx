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
  return getAllSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug, "en");
  if (!post) return { title: "Article not found" };

  return {
    title: `${post.title} | StropDesign Blog`,
    description: post.description,
    alternates: {
      canonical: `/en/blog/${params.slug}`,
      languages: { cs: `/blog/${params.slug}`, en: `/en/blog/${params.slug}` },
    },
  };
}

export default function BlogPostPageEN({ params }: Props) {
  const post = getPostBySlug(params.slug, "en");
  if (!post) notFound();

  return (
    <>
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/en/blog"
            className="inline-flex items-center gap-2 text-[12px] text-muted hover:text-accent tracking-[0.06em] uppercase mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
          <SectionEyebrow text="Blog" />
          <h1 className="font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] mb-6 text-heading">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
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
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] tracking-[0.08em] uppercase text-accent bg-accent-soft px-2.5 py-1 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 lg:pt-14 pb-16 lg:pb-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <BlogContent content={post.content} />
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-light-secondary border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[clamp(22px,3vw,32px)] font-semibold mb-4 text-heading">
            Interested in stretch ceilings?
          </h2>
          <p className="text-body text-sm leading-[1.7] font-light mb-8">
            Contact us for a free consultation and a tailor-made quote.
          </p>
          <Link
            href="/en/kontakt#kontakt-formular"
            className="inline-block bg-accent text-white text-[12px] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-accent-hover transition-colors duration-200 rounded-full"
          >
            Free enquiry
          </Link>
        </div>
      </section>
    </>
  );
}
