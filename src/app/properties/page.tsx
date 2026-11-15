import { GlobalPropertyGallery } from "@/components/property/global-property-gallery";
import { ListingExamples } from "@/components/property/listing-examples";
import { propertyMetadata } from "@/lib/property";
import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, PageIntro } from "@/components/property/chrome";
export const metadata: Metadata = propertyMetadata("Property Collection & Listing Examples", "Malta-based property brokerage with an international outlook. Explore five fictional listing examples for apartments, villas, estates and townhouses. No properties currently advertised.", "/properties");
export default function Properties() {return <><PageIntro path="/properties" eyebrow="Malta-based / Global property sales" title="Distinctive property. A considered presentation." description="See how apartments, villas, wine estates and traditional residences could be presented through Wiele. The examples below use fictional particulars and AI-created images; no properties are currently advertised for sale."/><ListingExamples category="property"/><section className="onboarding-invitation wrap"><div><span className="eyebrow">For property owners / Your next step</span><h2>Your property.<br/><em>Its own story.</em></h2><p>Marketing authority, verified particulars, photography, scope and fees are agreed for each instruction.</p></div><Link className="button" href="/contact?interest=marketing">Discuss marketing your property <Arrow diagonal/></Link></section><GlobalPropertyGallery/></>}
