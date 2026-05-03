import { Metadata } from "next";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Performance Advertising — Wiele Group",
  description: "Paid media strategy across Google, Meta, and LinkedIn that converts budget into pipeline. ROAS-focused, not impression-focused.",
  openGraph: { title: "Performance Advertising — Wiele Group", description: "Paid media that converts budget into pipeline." },
};

const data: ServicePageData = {
  slug: "advertising",
  name: "Performance Advertising",
  headline: "Every pound works. Every click counts.",
  subheadline: "Paid media strategy across Google, Meta, and LinkedIn engineered for pipeline and revenue — not impressions and vanity reach.",
  problemTitle: "Most ad spend is wasted",
  problemBody: "Agencies optimize for clicks and impressions because they're easy to report. But clicks don't pay invoices. We build advertising systems where every campaign is connected to pipeline, every creative is tested against revenue, and every pound of spend is accountable to growth.",
  steps: [
    { num: "01", title: "Channel Strategy", desc: "We audit your market, audience, and competitors to identify which channels deliver the highest-quality leads at the lowest acquisition cost." },
    { num: "02", title: "Campaign Architecture", desc: "Account structure, audience segmentation, creative frameworks, and landing page strategy — built for conversion, not complexity." },
    { num: "03", title: "Creative & Copy", desc: "Ad creative and landing pages designed around buyer psychology, tested systematically, and iterated on performance data." },
    { num: "04", title: "Optimization & Scale", desc: "Continuous bid management, audience refinement, creative rotation, and budget reallocation based on actual pipeline and revenue data." },
  ],
  deliverables: [
    { text: "Multi-channel paid media strategy" },
    { text: "Campaign setup and structure" },
    { text: "Ad creative and copy production" },
    { text: "Landing page design and optimization" },
    { text: "A/B testing frameworks" },
    { text: "Weekly performance reporting" },
    { text: "Revenue attribution tracking" },
    { text: "Budget pacing and reallocation" },
  ],
  results: [
    { metric: "+189%", label: "Avg ROAS improvement" },
    { metric: "-42%", label: "Cost per acquisition reduction" },
    { metric: "3.2x", label: "Pipeline from paid channels" },
    { metric: "£12M+", label: "Revenue influenced" },
  ],
  pricingFrom: "From £4,000/mo",
  pricingNote: "Ad management included in Growth tier. Ad spend is separate and billed directly by platforms.",
  faqs: [
    { question: "What platforms do you manage?", answer: "Google Ads (Search, Display, YouTube), Meta (Facebook, Instagram), LinkedIn, and Microsoft Advertising. We recommend channels based on your audience and budget." },
    { question: "What's the minimum ad budget?", answer: "We recommend a minimum of £3,000/month in ad spend to generate meaningful data. Our management fee is separate from your ad budget." },
    { question: "How do you track ROI on ad spend?", answer: "We implement full-funnel attribution — from ad click to pipeline to closed revenue. Every campaign connects to business outcomes, not just platform metrics." },
    { question: "Do you create the ad creative?", answer: "Yes. Strategy, copywriting, and visual creative are included. We produce, test, and iterate all ad assets." },
    { question: "How quickly can campaigns launch?", answer: "Typically 2-3 weeks from kickoff to live campaigns. That includes strategy, account setup, creative production, and QA." },
  ],
};

export default function AdvertisingPage() {
  return <ServicePageTemplate data={data} />;
}
