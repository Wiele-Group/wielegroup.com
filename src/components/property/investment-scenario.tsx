"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Arrow } from "./chrome";

const initial={price:300000,rent:1500,costs:3000,acquisition:25000,vacancy:5};
const money=(value:number)=>new Intl.NumberFormat("en-MT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(value);
const percent=(value:number)=>`${value.toFixed(2)}%`;

export function InvestmentScenario() {
  const id=useId();
  const [values,setValues]=useState(initial);
  const [downside,setDownside]=useState(false);
  const rent=values.rent*(downside?.9:1);
  const scheduled=rent*12;
  const vacancy=scheduled*values.vacancy/100;
  const effective=scheduled-vacancy;
  const operating=effective-values.costs;
  const basis=values.price+values.acquisition;
  const gross=scheduled/values.price*100;
  const operatingYield=operating/basis*100;
  const fields=[
    {key:"price" as const,label:"Purchase price",min:100000,max:2000000,step:10000,format:money},
    {key:"rent" as const,label:"Projected monthly rent",min:500,max:6000,step:50,format:money},
    {key:"acquisition" as const,label:"Acquisition costs & initial works",min:0,max:150000,step:1000,format:money},
    {key:"costs" as const,label:"Annual operating costs",min:0,max:15000,step:250,format:money},
    {key:"vacancy" as const,label:"Vacancy allowance",min:0,max:30,step:1,format:(value:number)=>`${value}%`},
  ];
  return <section className="investment-scenario" aria-labelledby={`${id}-title`}><div className="wrap scenario-heading"><span className="eyebrow">Investment property / Explore the assumptions</span><h2 id={`${id}-title`}>The headline.<br /><em>And the reality.</em></h2><p>Move the assumptions. See the relationship between the price, projected rent and operating costs.</p></div><div className="wrap scenario-layout"><div className="scenario-controls"><span className="scenario-assumption-label">Illustrative euro inputs · not market data</span>{fields.map(field=><div className="scenario-field" key={field.key}><label htmlFor={`${id}-${field.key}`}>{field.label}<output htmlFor={`${id}-${field.key}`}>{field.format(values[field.key])}</output></label><input id={`${id}-${field.key}`} type="range" min={field.min} max={field.max} step={field.step} value={values[field.key]} aria-valuetext={field.format(values[field.key])} onChange={event=>setValues(current=>({...current,[field.key]:Number(event.target.value)}))} /></div>)}<div className="scenario-actions"><button type="button" aria-pressed={downside} onClick={()=>setDownside(value=>!value)}>{downside?"Lower-rent scenario on":"Test 10% lower rent"}<span aria-hidden="true">{downside?"−":"+"}</span></button><button type="button" onClick={()=>{setValues(initial);setDownside(false);}}>Reset</button></div></div><div className="scenario-result"><div className="scenario-result-top"><span className="eyebrow">{downside?"Lower-rent illustration":"Your illustrative scenario"}</span><span className="scenario-pulse" aria-hidden="true" /></div><div className="scenario-yields"><div><span>Gross yield on price</span><strong>{percent(gross)}</strong><small>Scheduled annual rent ÷ purchase price</small></div><div><span>Operating yield on total cost</span><strong>{percent(operatingYield)}</strong><small>Operating income ÷ price, costs &amp; initial works</small></div></div><div className="scenario-income-graphic" role="img" aria-label={`Scheduled annual rent ${money(scheduled)}, vacancy ${money(vacancy)}, operating costs ${money(values.costs)}, operating income ${money(operating)}`}><span style={{width:`${Math.max(0,operating)/Math.max(scheduled,1)*100}%`}} /><i style={{width:`${Math.min(values.costs,effective)/Math.max(scheduled,1)*100}%`}} /><b style={{width:`${values.vacancy}%`}} /></div><dl className="scenario-ledger"><div><dt>Scheduled annual rent</dt><dd>{money(scheduled)}</dd></div><div><dt>Less vacancy allowance</dt><dd>−{money(vacancy)}</dd></div><div><dt>Less operating costs</dt><dd>−{money(values.costs)}</dd></div><div><dt>Annual operating income</dt><dd>{money(operating)}</dd></div><div><dt>Total price, costs &amp; initial works</dt><dd>{money(basis)}</dd></div></dl><p className="scenario-note">Projected rent and illustrative costs. This is not a property offer, valuation or forecast. Excludes financing, income tax and future capital expenditure. Actual costs and acquisition eligibility require property-specific advice; returns are not guaranteed.</p><Link className="text-link" href="/contact?interest=buying&focus=income">Discuss an income-led brief <Arrow diagonal /></Link></div></div><noscript><p className="wrap scenario-note">Illustration: €300,000 price, €25,000 acquisition costs and initial works, €1,500 projected monthly rent, 5% vacancy and €3,000 annual operating costs give 6.00% gross yield on price and 4.34% operating yield on total cost. This excludes financing, income tax and future capital expenditure.</p></noscript></section>;
}
