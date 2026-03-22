import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

// ── Types ──

export interface Surface {
  name: string;
  slug: string;
  color: string;
  accent: string;
  price: number;
  priceLabel: string;
  description: string;
  features: string[];
  sortOrder: number;
}

export interface Reference {
  title: string;
  meta: string;
  tag: string;
  gradient: string;
  image: string | null;
  description: string;
  featured: boolean;
  images: string[];
  sortOrder: number;
}

export interface Addon {
  nameCz: string;
  nameEn: string;
  price: number;
  icon: string;
  category: string;
  sortOrder: number;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  sortOrder: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  sortOrder: number;
}

// ── Data fetchers ──

export async function getSurfaces(locale: string = "cs"): Promise<Surface[]> {
  const col = locale === "en" ? "surfacesEn" : "surfacesCs";
  const entries = await reader.collections[col].all();
  return entries
    .map((e) => ({
      name: typeof e.entry.name === "string" ? e.entry.name : e.slug,
      slug: e.slug,
      color: e.entry.color,
      accent: e.entry.accent,
      price: e.entry.price ?? 0,
      priceLabel: e.entry.priceLabel,
      description: e.entry.description,
      features: e.entry.features as string[],
      sortOrder: e.entry.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getReferences(locale: string = "cs"): Promise<Reference[]> {
  const col = locale === "en" ? "referencesEn" : "referencesCs";
  const entries = await reader.collections[col].all();
  return entries
    .map((e) => ({
      title: typeof e.entry.title === "string" ? e.entry.title : e.slug,
      meta: e.entry.meta,
      tag: e.entry.tag,
      gradient: e.entry.gradient,
      image: e.entry.image ?? null,
      description: e.entry.description ?? "",
      featured: e.entry.featured ?? false,
      images: (e.entry.images as string[]) ?? [],
      sortOrder: e.entry.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAddons(): Promise<Addon[]> {
  const entries = await reader.collections.addons.all();
  return entries
    .map((e) => ({
      nameCz: typeof e.entry.nameCz === "string" ? e.entry.nameCz : e.slug,
      nameEn: e.entry.nameEn,
      price: e.entry.price ?? 0,
      icon: e.entry.icon,
      category: e.entry.category,
      sortOrder: e.entry.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getTestimonials(locale: string = "cs"): Promise<Testimonial[]> {
  const col = locale === "en" ? "testimonialsEn" : "testimonialsCs";
  const entries = await reader.collections[col].all();
  return entries
    .map((e) => ({
      name: typeof e.entry.name === "string" ? e.entry.name : e.slug,
      text: e.entry.text,
      rating: e.entry.rating ?? 5,
      sortOrder: e.entry.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFaqs(locale: string = "cs"): Promise<FaqItem[]> {
  const col = locale === "en" ? "faqEn" : "faqCs";
  const entries = await reader.collections[col].all();
  return entries
    .map((e) => ({
      question: typeof e.entry.question === "string" ? e.entry.question : e.slug,
      answer: e.entry.answer,
      sortOrder: e.entry.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// ── Blog ──

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string | null;
  tags: string[];
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function estimateReadingTime(text: string, locale: string = "cs"): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return locale === "en" ? `${minutes} min read` : `${minutes} min čtení`;
}

export async function getAllPosts(locale: string = "cs"): Promise<BlogPostMeta[]> {
  const col = locale === "en" ? "blogEn" : "blogCs";
  const entries = await reader.collections[col].all();
  const posts = await Promise.all(
    entries.map(async (e) => {
      const content =
        (await e.entry.content()) as unknown as { content: string } | string;
      const contentStr = typeof content === "string" ? content : "";
      return {
        slug: e.slug,
        title: typeof e.entry.title === "string" ? e.entry.title : e.slug,
        description: e.entry.description ?? "",
        date: e.entry.date ?? "",
        author: e.entry.author ?? "StropDesign",
        image: e.entry.image ?? null,
        tags: (e.entry.tags as string[]) ?? [],
        readingTime: estimateReadingTime(contentStr, locale),
      };
    })
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string,
  locale: string = "cs"
): Promise<BlogPost | null> {
  const col = locale === "en" ? "blogEn" : "blogCs";
  const entry = await reader.collections[col].read(slug);
  if (!entry) return null;

  const content =
    (await entry.content()) as unknown as { content: string } | string;
  const contentStr = typeof content === "string" ? content : "";

  return {
    slug,
    title: typeof entry.title === "string" ? entry.title : slug,
    description: entry.description ?? "",
    date: entry.date ?? "",
    author: entry.author ?? "StropDesign",
    image: entry.image ?? null,
    tags: (entry.tags as string[]) ?? [],
    readingTime: estimateReadingTime(contentStr, locale),
    content: contentStr,
  };
}

export async function getAllSlugs(locale: string = "cs"): Promise<string[]> {
  const col = locale === "en" ? "blogEn" : "blogCs";
  return await reader.collections[col].list();
}
