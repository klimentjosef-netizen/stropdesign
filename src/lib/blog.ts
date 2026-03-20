import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog-cs");
const BLOG_DIR_EN = path.join(process.cwd(), "content/blog-en");

function getBlogDir(locale: string = "cs"): string {
  return locale === "en" ? BLOG_DIR_EN : BLOG_DIR;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  readingTime: string;
}

function estimateReadingTime(text: string, locale: string = "cs"): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return locale === "en" ? `${minutes} min read` : `${minutes} min čtení`;
}

export function getAllPosts(locale: string = "cs"): BlogPostMeta[] {
  const dir = getBlogDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      author: data.author || "StropDesign",
      image: data.image || undefined,
      tags: data.tags || [],
      readingTime: estimateReadingTime(content, locale),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, locale: string = "cs"): BlogPost | null {
  const dir = getBlogDir(locale);
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    author: data.author || "StropDesign",
    image: data.image || undefined,
    tags: data.tags || [],
    readingTime: estimateReadingTime(content, locale),
    content,
  };
}

export function getAllSlugs(locale: string = "cs"): string[] {
  const dir = getBlogDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
