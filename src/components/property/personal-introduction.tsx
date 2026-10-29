import Link from "next/link";
import { Arrow } from "./chrome";
import { propertyBrand } from "@/lib/property";

export const enquirySteps = [
  ["01", "Share your brief.", "Tell us your property type, preferred locations, purchase-budget range and timing. For income-led acquisitions, include your income objectives and holding period."],
  ["02", "Clarify the detail.", "Jonathan is your point of contact to clarify the enquiry, identify the information available and explain where independent professional advice is needed."],
  ["03", "Agree the next step.", "Discuss a suitable introduction or marketing brief where available. Any work, costs and practitioner involvement are agreed before a commitment is made."],
] as const;

export function PersonalIntroduction() {
  return <section className="personal-introduction wrap" aria-labelledby="personal-contact-title"><div className="personal-contact-card"><span className="eyebrow">Your Wiele contact / Malta</span><h2 id="personal-contact-title">Jonathan<br /><em>Landman.</em></h2><p className="personal-role">Property marketing &amp; introductions</p><p>Based in Swieqi, Malta.<br />By appointment · English &amp; Afrikaans.</p><a className="text-link" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email} <Arrow diagonal /></a></div><div className="personal-contact-copy"><span className="eyebrow">An individual approach</span><h2>A clear brief.<br /><em>A direct relationship.</em></h2><p>Whether you are considering an income-producing apartment, a premium residence or marketing a property, Jonathan is your point of contact with Wiele.</p><p>The conversation starts with your objectives and the information available. Property particulars, income evidence, costs and material limitations shape the brief. Legal, tax, financing and technical advice remain with the relevant independent professionals.</p><Link className="button" href="/contact">Discuss your property brief <Arrow diagonal /></Link></div></section>;
}
export function EnquirySteps() {
  return <section className="enquiry-steps wrap" aria-labelledby="enquiry-steps-title"><span className="eyebrow">Malta property enquiries / What happens next</span><h2 id="enquiry-steps-title">Know the next step.<br /><em>From the start.</em></h2><ol>{enquirySteps.map(([number,title,body])=><li key={number}><span className="eyebrow">{number}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>;
}
