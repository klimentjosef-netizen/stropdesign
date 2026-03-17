import { NextResponse } from "next/server";

/* ────────────────────────────────────────────
   GET /api/reviews
   Stáhne recenze z Google Places API a kešuje je na 24h.

   Potřebné env proměnné:
     GOOGLE_PLACES_API_KEY  – API klíč z Google Cloud Console
     GOOGLE_PLACE_ID        – Place ID pro StropDesign

   Jak získat Place ID:
     1. Otevři https://developers.google.com/maps/documentation/places/web-service/place-id-finder
     2. Vyhledej "StropDesign Ostrava" nebo "Derbau s.r.o."
     3. Zkopíruj Place ID
   ──────────────────────────────────────────── */

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
  profile_photo_url?: string;
}

interface CachedData {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  fetchedAt: number;
}

// In-memory cache (persists across requests in the same serverless instance)
let cache: CachedData | null = null;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
  // Return cache if fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return NextResponse.json(cache, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Fallback — vrátíme prázdné pole, frontend zobrazí statické recenze
    return NextResponse.json(
      { reviews: [], rating: 0, totalReviews: 0, fetchedAt: Date.now(), fallback: true },
      { status: 200 }
    );
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "reviews,rating,user_ratings_total");
    url.searchParams.set("language", "cs");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, data.error_message);
      return NextResponse.json(
        { reviews: [], rating: 0, totalReviews: 0, fetchedAt: Date.now(), fallback: true },
        { status: 200 }
      );
    }

    const result: CachedData = {
      reviews: data.result.reviews || [],
      rating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0,
      fetchedAt: Date.now(),
    };

    // Update cache
    cache = result;

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
    });
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return NextResponse.json(
      { reviews: [], rating: 0, totalReviews: 0, fetchedAt: Date.now(), fallback: true },
      { status: 200 }
    );
  }
}
