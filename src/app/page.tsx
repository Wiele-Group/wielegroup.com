import Link from "next/link";
import Image from "next/image";
import { Arrow, ContactBand } from "@/components/property/chrome";

const lifestyles = [
  { image: "premium-terrace.webp", label: "01 / Open-air living", title: "A little closer to the sea.", caption: "Terraces, natural light and room to linger.", alt: "AI-created concept of a Mediterranean terrace; not a property for sale", interest: "buying" },
  { image: "valletta-balconies.webp", label: "02 / A sense of history", title: "Character at every turn.", caption: "Old streets. Limestone. A place with a past.", alt: "Traditional Maltese balconies in Valletta; location photograph, not a property listing", interest: "buying" },
  { image: "premium-interior.webp", label: "03 / Space to be yourself", title: "Life at your own pace.", caption: "Considered spaces for everyday living.", alt: "AI-created concept of a Mediterranean living room; not a property for sale", interest: "buying" },
];

export default function Home() {
  return <>
    <section className="estate-hero" aria-labelledby="home-title">
      <Image className="estate-hero-image" src="/property/premium-residence.webp" alt="AI-created concept of a Mediterranean limestone residence; not a property for sale" fill sizes="100vw" priority fetchPriority="high" />
      <div className="estate-hero-shade" />
      <div className="estate-hero-content wrap">
        <span className="eyebrow">Property in Malta · A personal perspective</span>
        <h1 id="home-title">A place apart.<br /><em>A life of your own.</em></h1>
        <p>For those finding their next home.<br />For owners ready for their next chapter.</p>
        <a className="hero-discover" href="#discover">Discover the Wiele approach <Arrow /></a>
      </div>
      <div className="estate-hero-caption wrap"><span>Malta. A sense of place.</span><span>AI-created architectural concept</span></div>
    </section>

    <div className="journey-bar wrap" aria-label="Start your property enquiry">
      <Link href="/contact?interest=marketing"><span><span className="eyebrow">For property owners</span><strong>Present your property.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
      <Link href="/contact?interest=buying"><span><span className="eyebrow">For home seekers</span><strong>Tell us what home means to you.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
    </div>

    <section id="discover" className="estate-introduction wrap">
      <div><span className="eyebrow">Independent. Individual. Wiele.</span><h2>Some places<br /><em>feel different.</em></h2></div>
      <div className="estate-introduction-copy"><p className="lead">The quiet of a courtyard. The light in a limestone room. A terrace that becomes part of everyday life.</p><p>We take a personal approach to property in Malta: understanding what makes a home distinctive, presenting it carefully and starting the right conversations.</p><Link className="text-link" href="/about">Meet Wiele <Arrow /></Link></div>
    </section>

    <section className="estate-lifestyles wrap">
      <div className="estate-section-heading"><div><span className="eyebrow">The island, your way</span><h2>Where you live.<br /><em>How you feel.</em></h2></div><p>Start with the life you want to lead.<br />Tell us the places and details that matter.</p></div>
      <div className="estate-lifestyle-grid">{lifestyles.map(item => <Link key={item.title} className="estate-lifestyle" href={`/contact?interest=${item.interest}`}><div className="estate-lifestyle-image"><Image src={`/property/${item.image}`} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className="lifestyle-image-label">{item.label}</span><span className="lifestyle-image-arrow"><Arrow diagonal /></span></div><h3>{item.title}</h3><p>{item.caption}</p></Link>)}</div>
      <p className="imagery-note">Terrace and interior: AI-created concepts. Valletta: location photography. These images do not show properties offered for sale.</p>
    </section>

    <section className="estate-seller">
      <figure><Image src="/property/premium-detail.webp" alt="AI-created concept of limestone, natural materials and curated interior details" fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>Material study · AI-created</figcaption></figure>
      <div className="estate-seller-copy"><span className="eyebrow">For owners in Malta</span><h2>A home of character.<br /><em>A story worth telling.</em></h2><p>Good presentation begins with the real details. We bring together a clear property brief, photography direction and considered copy to help a home make its introduction.</p><Link className="button button-gold" href="/selling">The seller experience <Arrow diagonal /></Link><span className="seller-small-note">Personal contact. Agreed scope. Clear next steps.</span></div>
    </section>

    <section className="estate-collection wrap"><div><span className="eyebrow">The Wiele collection / Coming into focus</span><h2>The first chapter<br /><em>starts with a conversation.</em></h2></div><div><p>No properties are currently advertised. We’re building the collection around verified details and agreed marketing authority.</p><p>Looking for a home, or considering how to present yours? We’d like to hear what you have in mind.</p><Link className="text-link" href="/properties">About the collection <Arrow /></Link></div></section>

    <section className="estate-principles"><div className="wrap"><div className="estate-section-heading"><div><span className="eyebrow">The Wiele approach</span><h2>Considered, from<br /><em>the first conversation.</em></h2></div><Link className="text-link" href="/about">Our perspective <Arrow /></Link></div><div className="estate-principles-grid"><article><span className="eyebrow">01 / Personal</span><h3>A direct relationship.</h3><p>Speak with Jonathan Landman, the person shaping your property’s presentation and your next steps with Wiele.</p></article><article><span className="eyebrow">02 / Purposeful</span><h3>Details with meaning.</h3><p>Honest information, deliberate photography and words that communicate the character of a home.</p></article><article><span className="eyebrow">03 / Clear</span><h3>Know the next step.</h3><p>Marketing scope and costs agreed before work begins. Transaction documentation handled by appropriately licensed practitioners.</p></article></div></div></section>
    <ContactBand />
  </>;
}
