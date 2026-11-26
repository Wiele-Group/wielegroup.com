import { SpecialistDesks, specialistDesksMetadata } from "@/components/luxury-assets/specialist-desks";

export const metadata = specialistDesksMetadata("en");

export default function LuxuryAssetsPage() {
  return <SpecialistDesks locale="en" />;
}
