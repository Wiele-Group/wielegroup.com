import type { Metadata } from "next";
import { OnboardingPage } from "@/components/property/onboarding-page";
import { onboardingContent } from "@/lib/property-onboarding-content";
import { illustrativeMandatesDescription } from "@/components/property/acquisition-mandates";
import { propertyMetadata } from "@/lib/property";
export const metadata: Metadata = propertyMetadata(onboardingContent.seller.title, `${onboardingContent.seller.description} ${illustrativeMandatesDescription}`, "/seller-enquiry");
export default function Page() { return <OnboardingPage kind="seller" />; }
