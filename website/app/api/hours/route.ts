import { NextResponse } from "next/server";
import { getPlaceHours } from "@/lib/google-hours";

export const revalidate = 3600;

export async function GET() {
  const hours = await getPlaceHours();
  return NextResponse.json(hours, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
