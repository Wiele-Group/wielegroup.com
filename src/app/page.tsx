import { PrivateTreatyHome } from "@/components/home/private-treaty-home";
import { homeMetadata } from "@/lib/homeMetadata";

export const metadata = homeMetadata("en");

export default function HomePage() {
  return <PrivateTreatyHome locale="en" />;
}
