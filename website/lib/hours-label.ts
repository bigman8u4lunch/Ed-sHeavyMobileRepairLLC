import type { BusinessHour } from "@/lib/site-data";

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function getPacificDayIndex(date = new Date()): number {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
  }).format(date);
  const idx = DAY_SHORT.indexOf(day as (typeof DAY_SHORT)[number]);
  return idx === -1 ? date.getDay() : idx;
}

/** Build the top-bar schedule string from weekly hours + optional live openNow. */
export function buildTodayHoursLabel(
  hours: BusinessHour[],
  openNow: boolean | null = null,
  date = new Date(),
): string {
  const today = DAY_SHORT[getPacificDayIndex(date)];
  const entry = hours.find((h) => h.day === today);
  const todayHours = entry?.hours ?? "Closed";
  const closedAllDay = /^closed$/i.test(todayHours);

  if (openNow === true) {
    const until = todayHours.includes("-")
      ? todayHours.split("-").pop()?.trim()
      : null;
    return until ? `Open now · Closes ${until}` : "Open now";
  }

  if (openNow === false) {
    if (closedAllDay) return "Closed today";
    return `Closed · Opens ${todayHours.split("-")[0]?.trim() ?? "later"}`;
  }

  if (closedAllDay) return "Closed today";
  return `Open Today: ${todayHours}`;
}
