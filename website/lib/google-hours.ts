import { business, type BusinessHour } from "@/lib/site-data";
import { buildTodayHoursLabel } from "@/lib/hours-label";

export type HoursSource = "google" | "fallback";

export type PlaceHours = {
  source: HoursSource;
  openNow: boolean | null;
  weekdayDescriptions: string[];
  hours: BusinessHour[];
  todayLabel: string;
};

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const DAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const REVALIDATE_SECONDS = 60 * 60; // 1 hour

type PlacePeriod = {
  open?: { day?: number; hour?: number; minute?: number };
  close?: { day?: number; hour?: number; minute?: number };
};

type PlaceOpeningHours = {
  openNow?: boolean;
  periods?: PlacePeriod[];
  weekdayDescriptions?: string[];
};

type PlaceDetailsResponse = {
  currentOpeningHours?: PlaceOpeningHours;
  regularOpeningHours?: PlaceOpeningHours;
  error?: { message?: string };
};

function formatClock(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  const mm = minute.toString().padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

function formatRange(
  openHour: number,
  openMinute: number,
  closeHour: number,
  closeMinute: number,
): string {
  return `${formatClock(openHour, openMinute)} - ${formatClock(closeHour, closeMinute)}`;
}

function periodsToBusinessHours(periods: PlacePeriod[] = []): BusinessHour[] {
  const byDay = new Map<number, string>();

  for (const period of periods) {
    if (
      period.open?.day == null ||
      period.open.hour == null ||
      period.open.minute == null
    ) {
      continue;
    }

    // Always-open sentinel used by Places API
    if (
      period.open.day === 0 &&
      period.open.hour === 0 &&
      period.open.minute === 0 &&
      !period.close
    ) {
      for (let d = 0; d < 7; d++) byDay.set(d, "Open 24 hours");
      break;
    }

    if (
      period.close?.day == null ||
      period.close.hour == null ||
      period.close.minute == null
    ) {
      continue;
    }

    const day = period.open.day;
    const range = formatRange(
      period.open.hour,
      period.open.minute,
      period.close.hour,
      period.close.minute,
    );
    const existing = byDay.get(day);
    byDay.set(day, existing ? `${existing}, ${range}` : range);
  }

  return DAY_SHORT.map((day, index) => ({
    day,
    hours: byDay.get(index) ?? "Closed",
  }));
}

function descriptionsToBusinessHours(
  descriptions: string[] = [],
): BusinessHour[] {
  const byDay = new Map<string, string>();

  for (const line of descriptions) {
    const match = line.match(
      /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday):\s*(.+)$/i,
    );
    if (!match) continue;
    const long = match[1];
    const value = match[2].trim();
    const idx = DAY_LONG.findIndex(
      (d) => d.toLowerCase() === long.toLowerCase(),
    );
    if (idx === -1) continue;
    byDay.set(
      DAY_SHORT[idx],
      /^closed$/i.test(value) ? "Closed" : value.replace(/[–—]/g, "-"),
    );
  }

  return DAY_SHORT.map((day) => ({
    day,
    hours: byDay.get(day) ?? "Closed",
  }));
}

function fallbackHours(): BusinessHour[] {
  return business.hours.map((h) => ({ ...h }));
}

function fromOpeningHours(
  opening: PlaceOpeningHours | undefined,
  source: HoursSource,
): PlaceHours | null {
  if (!opening) return null;

  let hours: BusinessHour[] = [];
  if (opening.weekdayDescriptions?.length) {
    hours = descriptionsToBusinessHours(opening.weekdayDescriptions);
  } else if (opening.periods?.length) {
    hours = periodsToBusinessHours(opening.periods);
  }

  if (!hours.length) return null;

  const openNow = typeof opening.openNow === "boolean" ? opening.openNow : null;

  return {
    source,
    openNow,
    weekdayDescriptions: opening.weekdayDescriptions ?? [],
    hours,
    todayLabel: buildTodayHoursLabel(hours, openNow),
  };
}

export function getFallbackPlaceHours(): PlaceHours {
  const hours = fallbackHours();
  return {
    source: "fallback",
    openNow: null,
    weekdayDescriptions: [],
    hours,
    todayLabel: buildTodayHoursLabel(hours, null),
  };
}

async function fetchGooglePlaceHours(): Promise<PlaceHours | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = business.googlePlaceId;
  if (!apiKey || !placeId) return null;

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "currentOpeningHours,regularOpeningHours",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(
        "[google-hours] Places API error",
        res.status,
        await res.text().catch(() => ""),
      );
      return null;
    }

    const data = (await res.json()) as PlaceDetailsResponse;
    return (
      fromOpeningHours(data.currentOpeningHours, "google") ??
      fromOpeningHours(data.regularOpeningHours, "google")
    );
  } catch (error) {
    console.error("[google-hours] Places API request failed", error);
    return null;
  }
}

/** Live Google Business hours when configured; otherwise static fallback. */
export async function getPlaceHours(): Promise<PlaceHours> {
  const live = await fetchGooglePlaceHours();
  return live ?? getFallbackPlaceHours();
}

export async function getTodayHoursLabel(): Promise<string> {
  const placeHours = await getPlaceHours();
  return placeHours.todayLabel;
}
