import Link from "next/link";
import { PageIntro, Arrow } from "@/components/property/chrome";
export default function NotFound() {return <><PageIntro eyebrow="Wiele Property / Page not found" title="A different direction." description="This page isn’t here. Wiele has a new focus: independent property marketing in Malta." /><div className="wrap not-found-action"><Link href="/" className="button">Back to Wiele <Arrow /></Link></div></>}
