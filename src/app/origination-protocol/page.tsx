import { OriginationProtocol, originationMetadata } from "@/components/origination/protocol";

export const metadata = originationMetadata("en");

export default function OriginationPage() {
  return <OriginationProtocol locale="en" />;
}
