import { ResearchLibrary, researchMetadata } from "@/components/research/research-library";

export const metadata = researchMetadata("en");

export default function ResearchPage() {
  return <ResearchLibrary locale="en" />;
}
