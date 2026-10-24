import Link from "next/link";
import Image from "next/image";
import { Arrow, ContactBand } from "@/components/property/chrome";

const principles = [
 ["01", "One relationship.", "Direct contact with the person shaping your property’s marketing. A clear conversation, from the first question to the next step."],
 ["02", "A considered presentation.", "Photography, words and a marketing plan built around what makes a property worth noticing."],
 ["03", "The right connections.", "Thoughtful introductions, with sales documentation handled by appropriately licensed practitioners."],
];
export default function Home() {
 return <>
  <section className="hero">
   <div className="hero-copy"><span className="eyebrow"><span className="tiny-line" />Malta · Independent property marketing</span><h1>A more<br /><em>personal</em><br />way home.</h1><p>Good property deserves thoughtful attention. A fresh perspective on marketing homes in Malta, built around people and the places they call home.</p><Link className="button" href="/selling">Explore our approach <Arrow diagonal /></Link><div className="hero-footnote"><span className="coordinate">35.8992° N · 14.5141° E</span><span>Rooted in Malta.</span></div></div>
   <figure className="hero-image"><Image src="/property/malta-harbour.webp" alt="Valletta’s limestone waterfront and skyline across the blue Mediterranean" fill sizes="(max-width: 760px) 100vw, 58vw" priority fetchPriority="high" /><div className="image-caption"><span>AN ISLAND. A SENSE OF BELONGING.</span><span>Valletta, Malta <Arrow diagonal /></span></div><span className="image-vertical">THE WIELE PERSPECTIVE / 01</span></figure>
  </section>
  <div className="editorial-strip"><span>Thoughtful marketing.</span><span>Personal attention.</span><span>A local perspective.</span></div>
  <section className="intro-section wrap"><div><span className="eyebrow">Property is personal</span><h2>More than a place.<br /><em>A next chapter.</em></h2></div><div className="intro-copy"><p className="lead">A home is never just square metres. It is a daily rhythm, a neighbourhood, a feeling when you walk through the door.</p><p>Wiele brings that perspective to property marketing in Malta. Clear presentation. Direct communication. Space for the details that matter to you.</p><Link className="text-link" href="/about">Meet the Wiele approach <Arrow /></Link></div></section>
  <section className="pathways wrap"><Link href="/selling" className="pathway"><span className="eyebrow">01 / For property owners</span><div><h3>Make your home’s<br />next impression count.</h3><span className="round-arrow"><Arrow diagonal /></span></div><p>Discover a considered approach to presenting and marketing your property.</p><span className="text-link">The seller perspective <Arrow /></span></Link><Link href="/buying" className="pathway pathway-green"><span className="eyebrow">02 / For property seekers</span><div><h3>Find the place<br />that feels like you.</h3><span className="round-arrow"><Arrow diagonal /></span></div><p>Start with what matters: the place, the possibilities and how you want to live.</p><span className="text-link">The buyer perspective <Arrow /></span></Link></section>
  <section className="place-section wrap"><figure><Image src="/property/valletta-balconies.webp" alt="Traditional green timber balconies against sunlit Maltese limestone in Valletta" fill sizes="(max-width: 760px) 100vw, 45vw" /><figcaption>THE DETAILS MAKE THE DIFFERENCE.</figcaption></figure><div><span className="eyebrow">Our point of view</span><h2>The character<br />is in <em>the detail.</em></h2><p>From limestone streets to a quieter stretch of coastline, Malta’s neighbourhoods each have their own rhythm. The right property story starts with understanding its setting.</p><p>We look beyond a checklist to the light, the layout and the life a place makes possible—then bring those details into focus.</p><Link className="text-link" href="/properties">Explore the collection <Arrow /></Link></div></section>
  <section className="principles-section"><div className="wrap"><div className="section-heading"><span className="eyebrow">The Wiele difference</span><h2>Considered at every step.</h2></div><div className="principles-grid">{principles.map(([n,title,body])=><article key={n}><span className="principle-number">{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
  <ContactBand />
 </>;
}
