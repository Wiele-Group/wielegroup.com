import Link from "next/link";
import { Arrow } from "./chrome";
export function ComplianceIntroduction() {
  return <section className="compliance-introduction wrap" aria-labelledby="home-compliance-title"><div><span className="eyebrow">Malta property investment / Legal compliance</span><h2 id="home-compliance-title">Know the route.<br /><em>Before the commitment.</em></h2></div><div><p>EU investors, non-EU buyers, third-country nationals and corporations face different acquisition questions. Explore AIP permits, Special Designated Areas, ownership structures and the checks to discuss with your independent advisers.</p><Link className="text-link" href="/legal-compliance">Read the legal guide &amp; FAQs <Arrow diagonal /></Link></div></section>;
}
