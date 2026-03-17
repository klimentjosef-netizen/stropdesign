"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-display text-[clamp(20px,2.5vw,28px)] font-semibold text-heading mt-10 mb-4 leading-[1.3]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-display text-lg font-semibold text-heading mt-8 mb-3 leading-[1.3]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-body text-[15px] leading-[1.85] font-light mb-5"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-body text-[15px] leading-[1.85] font-light mb-5 space-y-1.5 pl-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-body text-[15px] leading-[1.85] font-light mb-5 space-y-1.5 pl-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-body" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-heading" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-accent pl-5 my-6 italic text-body/80"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left font-semibold text-heading bg-light-secondary px-4 py-2.5 border border-border text-[13px]"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2.5 border border-border text-body text-[13px]"
      {...props}
    />
  ),
};

export default function BlogContent({ content }: { content: string }) {
  return (
    <article className="prose-custom">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
