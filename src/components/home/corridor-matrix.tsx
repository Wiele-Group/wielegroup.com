import { Fragment } from "react";
import type { HomeCopy } from "@/lib/home-locales/types";

const corridorIds = ["uk", "continental-europe", "central-mediterranean", "southern-africa"] as const;

export function CorridorMatrix({ copy }: { copy: HomeCopy }) {
  return (
    <section id="capital-corridors" className="private-corridors private-section" aria-labelledby="corridors-title">
      <div className="private-heading">
        <h2 id="corridors-title">{copy.corridorsTitle}</h2>
        <p>{copy.corridorsIntro}</p>
      </div>
      <fieldset className="private-matrix">
        <legend className="private-visually-hidden">{copy.corridorLabel}</legend>
        <div className="private-matrix-grid">
          {copy.corridors.map(({ name, liquidity, assets, timing }, index) => {
            const id = `corridor-${corridorIds[index]}`;
            return (
              <Fragment key={id}>
                <input className="private-visually-hidden" type="radio" name="capital-corridor" id={id} aria-controls={id + "-profile"} defaultChecked={index === 0} />
                <label id={id + "-name"} htmlFor={id}>{name}</label>
                <dl id={id + "-profile"} className="private-matrix-profile" aria-labelledby={id + "-name"}>
                  <div><dt>{copy.corridorFields[0]}</dt><dd>{liquidity}</dd></div>
                  <div><dt>{copy.corridorFields[1]}</dt><dd>{assets}</dd></div>
                  <div><dt>{copy.corridorFields[2]}</dt><dd>{timing}</dd></div>
                </dl>
              </Fragment>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
