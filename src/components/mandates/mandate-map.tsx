import type { ReactNode } from "react";

export type MapPoint = { label: string; point: readonly [number, number]; offset?: readonly [number, number] };

const width = 624;
const height = 462;
const xPosition = (lon: number) => (lon + 34) * 6;
const yPosition = (lat: number) => (65 - lat) * 4.4;

export function MandateMap({ label, points, pulse = false }: { label: string; points: readonly MapPoint[]; pulse?: boolean }) {
  return (
    <svg className="mandate-map" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <image href="/images/mandates/corridor-map.svg" width={width} height={height} />
      {points.map(({ label, point: [lon, lat], offset }, index) => {
        const x = xPosition(lon);
        const y = yPosition(lat);
        const annotation: ReactNode = offset && <text x={offset[0]} y={offset[1]}>{label}</text>;
        return (
          <g key={label} transform={`translate(${x} ${y})`}>
            <title>{label}</title>
            {pulse && <circle className="mandate-pulse" style={{ animationDelay: `${index * 220}ms` }} r="9" />}
            <circle className="mandate-map-node" r="4" />
            {annotation}
          </g>
        );
      })}
    </svg>
  );
}
