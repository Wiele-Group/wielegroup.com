import type { Metadata } from "next";
import { OnboardingPage } from "@/components/property/onboarding-page";
import { propertyMetadata } from "@/lib/property";
import { onboardingContent } from "@/lib/property-onboarding-content";
const content = onboardingContent.investor;
export const metadata: Metadata = propertyMetadata(content.title, content.description, "/investor-onboarding");
export default function Page() { return <OnboardingPage kind="investor" />; }
