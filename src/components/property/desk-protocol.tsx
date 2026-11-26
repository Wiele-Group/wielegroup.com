import { Fragment } from "react";
type ProtocolCopy = {
  protocolTitle: string;
  protocolIntro: string;
  stageControl: string;
  stageFields: readonly string[];
  stages: readonly (readonly [string, string, ...string[]])[];
};

export function DeskProtocol({ copy, sectionId, stageId }: { copy: ProtocolCopy; sectionId: string; stageId: string }) {
  const headingId = sectionId + "-title";
  return (
    <section className="acq-section" id={sectionId} aria-labelledby={headingId}>
      <div className="acq-heading">
        <h2 id={headingId}>{copy.protocolTitle}</h2>
        <p>{copy.protocolIntro}</p>
      </div>
      <fieldset className="acq-protocol">
        <legend className="acq-hidden">{copy.stageControl}</legend>
        <div className="acq-stage-grid">
          {copy.stages.map(([title, summary, ...details], index) => {
            const id = `${stageId}-${index + 1}`;
            return (
              <Fragment key={id}>
                <input className="acq-hidden" type="radio" name={stageId} id={id}
                  aria-controls={id + "-panel"} defaultChecked={index === 0} />
                <label id={id + "-label"} htmlFor={id}><span>{String(index + 1).padStart(2, "0")}.</span>{title}</label>
                <div className="acq-stage-panel" id={id + "-panel"} role="region" aria-labelledby={id + "-label"}>
                  <p>{summary}</p>
                  <dl>{details.map((detail, field) => <div key={copy.stageFields[field]}>
                    <dt>{copy.stageFields[field]}</dt><dd>{detail}</dd>
                  </div>)}</dl>
                </div>
              </Fragment>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
