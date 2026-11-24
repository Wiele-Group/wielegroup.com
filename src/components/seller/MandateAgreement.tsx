import {
  mandateAgreement,
  mandateScheduleACommercialTerms,
  mandateScheduleAFields,
  type MandateScheduleAValues,
} from "@/lib/mandateAgreement";
import styles from "./MandateAgreement.module.css";

export function MandateClauses({ heading: Heading }: { heading: "h2" | "h3" }) {
  return mandateAgreement.map((clause, index) => {
    const id = `retainer-term-${index + 1}`;

    return (
      <section key={clause.title} aria-labelledby={id}>
        <Heading id={id}>{clause.title}</Heading>
        {clause.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>
    );
  });
}

export function MandateScheduleA({
  heading: Heading,
  values,
}: {
  heading: "h2" | "h3";
  values?: MandateScheduleAValues;
}) {
  return (
    <section className={styles.schedule} aria-labelledby="mandate-schedule-heading">
      <Heading id="mandate-schedule-heading">Schedule A — Designated asset and commercial terms</Heading>
      <dl>
        {mandateScheduleAFields.map(({ key, label }) => (
          <div key={key} className={styles.row}>
            <dt>{label}</dt>
            <dd>{values?.[key] || (values ? "Awaiting entry" : "Completed during onboarding")}</dd>
          </div>
        ))}
        {mandateScheduleACommercialTerms.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
