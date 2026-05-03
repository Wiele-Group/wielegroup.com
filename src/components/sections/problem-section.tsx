import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { problemPoints } from "@/data/homepage";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            The shift
          </p>
          <h2 className="text-display-lg text-white text-balance">
            AI didn&apos;t kill search. It changed what search rewards.
          </h2>
          <p className="text-body-lg text-silver mt-5">
            The brands that win the next decade engineer for citation, not
            clicks. The rest will optimise for an audience that no longer
            arrives.
          </p>
        </div>

        <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-2">
          {problemPoints.map((point) => (
            <Card key={point.title} variant="default">
              <CardTitle className="mb-2">{point.title}</CardTitle>
              <CardContent className="text-silver">{point.body}</CardContent>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
