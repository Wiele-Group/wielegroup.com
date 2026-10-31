import Link from "next/link";
import { Arrow } from "./chrome";

export function MaintenanceIntroduction() {
  return <section className="maintenance-introduction" aria-labelledby="home-maintenance-title"><div className="wrap maintenance-introduction-inner"><div><span className="eyebrow">Malta property maintenance / Managed &amp; operated by Wiele</span><h2 id="home-maintenance-title">Care for the property.<br /><em>Attention to the detail.</em></h2><p>Introducing Wiele Property Maintenance. Practical repairs, considered upkeep and property preparation, with one clear brief and an agreed scope of work.</p><Link className="button button-gold" href="/property-maintenance">Explore property maintenance <Arrow diagonal /></Link></div><div className="maintenance-introduction-list"><span>01 / Repair <strong>The everyday details.</strong></span><span>02 / Refresh <strong>The finish and presentation.</strong></span><span>03 / Maintain <strong>The care that continues.</strong></span><Link className="text-link" href="/property-maintenance#request-maintenance">Discuss your maintenance brief <Arrow diagonal /></Link></div></div></section>;
}
