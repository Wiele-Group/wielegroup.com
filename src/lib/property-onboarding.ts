import { z } from "zod";

export const onboardingOptions = {
  structure: ["Individual", "Joint purchasers", "Company", "Trust / partnership / consortium", "To be decided"],
  use: ["Primary home", "Second / holiday home", "Long-term residential letting", "Tourist accommodation", "Commercial / development", "Mixed / undecided"],
  budget: ["Under €300,000", "€300,000–€500,000", "€500,000–€1 million", "€1–€3 million", "Over €3 million", "To be discussed"],
  funding: ["Own funds", "Mortgage / bank finance", "Own funds and borrowing", "Company / third-party funding", "To be confirmed"],
  timing: ["Within 3 months", "3–6 months", "6–12 months", "Exploring options"],
  eligibility: ["Not yet reviewed", "Under review with my adviser", "Adviser has reviewed my proposed route"],
  authority: ["Sole owner", "Joint owner", "Company representative", "Attorney / estate representative", "Other authorised representative"],
  propertyType: ["Apartment / penthouse / maisonette", "House / townhouse / villa", "Block / portfolio", "Commercial property", "Land / development", "Other"],
  tenure: ["Freehold", "Ground rent / emphyteusis", "Other / not confirmed"],
  occupancy: ["Vacant", "Owner occupied", "Tenanted", "Partly occupied / mixed", "To be confirmed"],
  epc: ["Valid EPC available", "EPC commissioned", "Not commissioned / unsure", "Possible exemption — needs confirmation"],
  planning: ["Plans and permits available for review", "Documents being gathered", "Known discrepancy / enforcement matter", "Not yet checked"],
} as const;
export type OnboardingKind = "investor" | "seller";
const locality = z.string().trim().min(2).max(160);
const investorSchema = z.object({
  structure: z.enum(onboardingOptions.structure), use: z.enum(onboardingOptions.use),
  budget: z.enum(onboardingOptions.budget), funding: z.enum(onboardingOptions.funding),
  timing: z.enum(onboardingOptions.timing), eligibility: z.enum(onboardingOptions.eligibility),
  locality, residenceCountry: z.string().trim().min(2).max(80),
}).strict();
const sellerSchema = z.object({
  authority: z.enum(onboardingOptions.authority), propertyType: z.enum(onboardingOptions.propertyType),
  tenure: z.enum(onboardingOptions.tenure), occupancy: z.enum(onboardingOptions.occupancy),
  epc: z.enum(onboardingOptions.epc), planning: z.enum(onboardingOptions.planning),
  timing: z.enum(onboardingOptions.timing), locality,
}).strict();
export const propertyOnboardingSchema = z.discriminatedUnion("kind", [
  z.object({kind: z.literal("investor"), details: investorSchema, acknowledgement: z.literal(true)}).strict(),
  z.object({kind: z.literal("seller"), details: sellerSchema, acknowledgement: z.literal(true)}).strict(),
]);
export const onboardingFieldLabels: Record<string, string> = {
  structure: "Purchasing structure", use: "Intended property use", budget: "Indicative budget in EUR", funding: "Funding route",
  timing: "Preferred timing", eligibility: "Acquisition eligibility review", locality: "Property country and locations",
  residenceCountry: "Country of residence", authority: "Your relationship to the property", propertyType: "Property type",
  tenure: "Title / tenure", occupancy: "Occupancy", epc: "Energy performance certificate", planning: "Planning documents",
};
