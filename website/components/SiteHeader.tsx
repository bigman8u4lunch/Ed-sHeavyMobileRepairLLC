import Header from "@/components/Header";
import { getPlaceHours } from "@/lib/google-hours";

export default async function SiteHeader({
  activePath = "/",
}: {
  activePath?: string;
}) {
  const placeHours = await getPlaceHours();
  return (
    <Header
      activePath={activePath}
      initialHours={placeHours.hours}
      initialOpenNow={placeHours.openNow}
    />
  );
}
