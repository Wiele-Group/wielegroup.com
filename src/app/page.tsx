import Link from "next/link";
import Image from "next/image";
import { Arrow, ContactBand } from "@/components/property/chrome";

const lifestyles = [
  { image: "premium-terrace.webp", label: "01 / Income evidence", title: "Start with the income.", caption: "Distinguish collected rent, contracted rent and projected income.", alt: "AI-created concept of a Mediterranean terrace; not a property for sale", interest: "buying" },
  { image: "valletta-balconies.webp", label: "02 / Asset fundamentals", title: "Understand the property.", caption: "Assess location, condition, lease terms and future capital requirements.", alt: "Traditional Maltese balconies in Valletta; location photograph, not a property listing", interest: "buying" },
  { image: "premium-interior.webp", label: "03 / Investor fit", title: "Define your mandate.", caption: "Match the asset to your budget, income objectives and holding period.", alt: "AI-created concept of a Mediterranean living room; not a property for sale", interest: "buying" },
];

export default function Home() {
  return <>
    <section className="estate-hero" aria-labelledby="home-title">
      <Image className="estate-hero-image" src="/property/premium-residence.webp" alt="AI-created concept of a Mediterranean limestone residence; not a property for sale" fill sizes="100vw" priority fetchPriority="high" />
      <div className="estate-hero-shade" />
      <div className="estate-hero-content wrap">
        <span className="eyebrow">Malta investment property · Marketing & introductions</span>
        <h1 id="home-title">Property with purpose.<br /><em>Income in focus.</em></h1>
        <p>For international investors and consortiums.<br />A considered approach to income-producing real estate in Malta.</p>
        <a className="hero-discover" href="#discover">Discover the Wiele approach <Arrow /></a>
      </div>
      <div className="estate-hero-caption wrap"><span>Malta. A sense of place.</span><span>AI-created architectural concept</span></div>
    </section>

    <div className="journey-bar wrap" aria-label="Start your property enquiry">
      <Link href="/contact?interest=marketing"><span><span className="eyebrow">For property owners</span><strong>Present your investment property.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
      <Link href="/contact?interest=buying"><span><span className="eyebrow">For investors & consortiums</span><strong>Share your investment brief.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
    </div>

    <section id="discover" className="estate-introduction wrap">
      <div><span className="eyebrow">Independent. Individual. Wiele.</span><h2>The asset.<br /><em>The income. The detail.</em></h2></div>
      <div className="estate-introduction-copy"><p className="lead">An investment property needs more than a compelling photograph. Its income, costs and risks need a clear explanation.</p><p>Wiele focuses on Malta investment property marketing and introductions. We bring property owners and prospective investors into a conversation grounded in an accurate brief, documented information and clear next steps.</p><Link className="text-link" href="/about">Meet Wiele <Arrow /></Link></div>
    </section>

    <section className="estate-lifestyles wrap">
      <div className="estate-section-heading"><div><span className="eyebrow">An investment perspective</span><h2>Look beyond the asking price.<br /><em>Understand the proposition.</em></h2></div><p>Income objectives. Operating costs. Lease quality.<br />The right questions come before a return claim.</p></div>
      <div className="estate-lifestyle-grid">{lifestyles.map(item => <Link key={item.title} className="estate-lifestyle" href={`/contact?interest=${item.interest}`}><div className="estate-lifestyle-image"><Image src={`/property/${item.image}`} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className="lifestyle-image-label">{item.label}</span><span className="lifestyle-image-arrow"><Arrow diagonal /></span></div><h3>{item.title}</h3><p>{item.caption}</p></Link>)}</div>
      <p className="imagery-note">Terrace and interior: AI-created concepts. Valletta: location photography. These images do not show properties offered for sale.</p>
    </section>

    <section className="estate-seller">
      <figure><Image src="/property/premium-detail.webp" alt="AI-created concept of limestone, natural materials and curated interior details" fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>Material study · AI-created</figcaption></figure>
      <div className="estate-seller-copy"><span className="eyebrow">For owners in Malta</span><h2>An income-producing asset.<br /><em>A clear investment case.</em></h2><p>We help owners present the property and the information investors need: income evidence, lease terms, operating costs, condition and material limitations. Marketing scope and any specialist involvement are agreed before work begins.</p><Link className="button button-gold" href="/selling">The seller experience <Arrow diagonal /></Link><span className="seller-small-note">Personal contact. Agreed scope. Clear next steps.</span></div>
    </section>

    <section className="estate-collection wrap"><div><span className="eyebrow">Investment opportunities / Taking shape</span><h2>The first chapter<br /><em>starts with a conversation.</em></h2></div><div><p>No properties are currently advertised. We’re building the collection around verified details and agreed marketing authority.</p><p>Seeking an income-producing property, a portfolio or a consortium acquisition? Share your requirements. No return or availability is implied by an enquiry.</p><Link className="text-link" href="/properties">About the collection <Arrow /></Link></div></section>

    <section className="estate-principles"><div className="wrap"><div className="estate-section-heading"><div><span className="eyebrow">The Wiele approach</span><h2>Considered, from<br /><em>the first conversation.</em></h2></div><Link className="text-link" href="/about">Our perspective <Arrow /></Link></div><div className="estate-principles-grid"><article><span className="eyebrow">01 / Personal</span><h3>A direct relationship.</h3><p>Speak with Jonathan Landman, the person shaping your property’s presentation and your next steps with Wiele.</p></article><article><span className="eyebrow">02 / Purposeful</span><h3>Details with meaning.</h3><p>Clear income definitions, relevant property details and transparent assumptions. Any investment return depends on the asset, costs and circumstances; it is not guaranteed.</p></article><article><span className="eyebrow">03 / Clear</span><h3>Know the next step.</h3><p>Marketing scope and costs agreed before work begins. Transaction documentation handled by appropriately licensed practitioners.</p></article></div></div></section>
    <ContactBand />
  </>;
}
