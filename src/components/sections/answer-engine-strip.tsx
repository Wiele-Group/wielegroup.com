import { MarqueeRail } from "@/components/visual/marquee-rail";

/**
 * AnswerEngineStrip — second marquee on the homepage.
 *
 * Visual purpose: keep the page alive between the bento system and the
 * audit preview. Reinforces "we engineer for the answer surfaces buyers
 * actually use." Mirrors the ProofStrip motion + accessibility behaviour.
 *
 * Items rotate slower than ProofStrip (44s vs 38s) so the two rails
 * don't sync — staggered motion reads as ambient, not mechanical.
 */
const answerEngineItems = [
  { label: "ChatGPT" },
  { label: "Google AI Overviews" },
  { label: "Gemini" },
  { label: "Perplexity" },
  { label: "Claude" },
  { label: "Copilot" },
  { label: "Grok" },
  { label: "DeepSeek" },
  { label: "You.com" },
  { label: "Brave Search" },
];

export function AnswerEngineStrip() {
  return (
    <MarqueeRail
      items={answerEngineItems}
      duration={44}
      ariaLabel="Answer engines we engineer for"
    />
  );
}
