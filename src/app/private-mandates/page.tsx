import { PrivateMandates, mandateMetadata } from "@/components/mandates/private-mandates";

export const metadata = mandateMetadata("en");

export default function PrivateMandatesPage() {
  return <PrivateMandates locale="en" />;
}
