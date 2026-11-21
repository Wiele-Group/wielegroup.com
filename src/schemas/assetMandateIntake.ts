import { z } from "zod";

export type CurrencyCode = 'GBP' | 'EUR' | 'ZAR' | 'USD';
export type JurisdictionRegion = 'UK' | 'EU_MALTA' | 'SOUTH_AFRICA' | 'OTHER';

export interface BaseSellerIntake {
  assetCategory: 'PROPERTY' | 'YACHT' | 'CLASSIC_CAR';
  jurisdiction: JurisdictionRegion;
  askingPrice: number;
  currency: CurrencyCode;
  priceDisplayMode: 'EXACT' | 'GUIDE_RANGE' | 'POA';
  mandateAuthorityType: 'SOLE_EXCLUSIVE' | 'JOINT_AGENCY' | 'DIRECT_OWNER_BRIEF' | 'REPRESENTATIVE';
  sellerTaxResidency: 'DOMESTIC' | 'EU_EEA' | 'NON_RESIDENT';
  encumbrancesOrFinance: 'UNENCUMBERED' | 'ACTIVE_MORTGAGE_OR_LIEN' | 'CORPORATE_SPV_HELD';
  preferredLanguage: 'EN' | 'AF';
}

/**
 * 01 / PROPERTY — Complete Buyer-Grade Specification & Due-Diligence Fields
 */
export interface PropertySellerFields extends BaseSellerIntake {
  assetCategory: 'PROPERTY';
  // 01 Core Identity & Location
  propertyStyle:

    | 'COASTAL_VILLA' | 'PENTHOUSE_APARTMENT' | 'TOWNHOUSE_MEWS' | 'COUNTRY_ESTATE'
    | 'WINE_OR_GAME_FARM' | 'COMMERCIAL_OFFICE' | 'INDUSTRIAL_LOGISTICS' | 'DEVELOPMENT_LAND';
  country: string;
  regionOrCity: string;
  suburbOrPostcode: string;
  isSpecialDesignatedAreaMalta?: boolean; // Reported designation. Confirm the applicable acquisition route.

  // 02 Tenure & Legal Title
  tenureType:

    | 'FREEHOLD_FULL_TITLE' | 'LEASEHOLD' | 'SHARE_OF_FREEHOLD' | 'COMMONHOLD'
    | 'SECTIONAL_TITLE' | 'SHARE_BLOCK' | 'LIFE_RIGHTS' | 'USUFRUCT' | 'EMPHYTEUSIS';
  unexpiredLeaseYears?: number;
  annualGroundRent?: number;
  annualServiceChargeOrLevies?: number;
  annualMunicipalRatesTax?: number;
  heritageOrListedStatus: 'NONE' | 'UK_GRADE_I' | 'UK_GRADE_II' | 'HERITAGE_PROTECTED';

  // 03 Dimensions, Layout & Infrastructure
  internalAreaSqm: number;
  erfOrPlotSizeSqm: number;
  bedrooms: number;
  bathrooms: number;
  receptionRooms: number;
  garagingOrParkingSpaces: number;
  yearBuilt: number;
  lastMajorRenovationYear?: number;
  epcEnergyRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'EXEMPT';
  offGridAndSecurityFeatures: string[]; // e.g., Solar/Inverter, Borehole, Desalination, 24h Estate Security, Private Mooring/Helipad

  // 04 Financial & Investment Evidence
  occupancyStatus: 'OWNER_OCCUPIED' | 'VACANT_POSSESSION' | 'TENANTED_LEASED';
  grossAnnualRentalIncome?: number;
  netOperatingIncomeNOI?: number;
  netInitialYieldPercent?: number;

  // 05 Due-Diligence Records Held on File (Feeds Readiness Meter)
  recordsOnFile: {
    titleDeedOrLandRegistryExtract: boolean;
    approvedArchitecturalPlans: boolean;
    epcAndComplianceCertificates: boolean; // UK EPC / SA Electrical, Beetle, Plumbing, Gas / EU Notarial check
    bodyCorporateOrHOAFinancials: boolean;
    verifiedRentalAndExpenseLedger: boolean;
  };
}

/**
 * 02 / YACHTS — Complete Buyer-Grade Marine, Flag, VAT & Survey Fields
 */
export interface YachtSellerFields extends BaseSellerIntake {
  assetCategory: 'YACHT';
  // 01 Core Identity & Pedigree
  yachtType: 'MOTOR_YACHT' | 'SAILING_YACHT' | 'EXPLORER_EXPEDITION' | 'CATAMARAN' | 'CLASSIC_GENTLEMANS_YACHT';
  builderShipyard: string;
  modelOrSeries: string;
  navalArchitect?: string;
  interiorDesigner?: string;
  buildYear: number;
  lastRefitYear?: number;
  refitScopeSummary?: string;

  // 02 Dimensions, Hull & Performance
  loaMeters: number; // Length Overall
  beamMeters: number;
  draftMeters: number;
  grossTonnageGT: number;
  hullMaterial: 'GRP_COMPOSITE' | 'STEEL' | 'ALUMINIUM' | 'CARBON_FIBRE' | 'WOOD_COLD_MOLDED';
  superstructureMaterial: string;
  hullConfiguration: 'DISPLACEMENT' | 'SEMI_DISPLACEMENT' | 'PLANING' | 'MULTIHULL';
  enginesMakeAndModel: string;
  engineHoursPort: number;
  engineHoursStarboard: number;
  cruisingSpeedKnots: number;
  maxSpeedKnots: number;
  rangeNauticalMiles: number;
  fuelCapacityLitres: number;
  freshWaterCapacityLitres: number;
  stabilizers: 'ZERO_SPEED_FIN' | 'GYRO' | 'UNDERWAY_ONLY' | 'NONE';

  // 03 Accommodation & Tender/Toys
  guestCabins: number;
  guestBerths: number;
  crewCabins: number;
  crewBerths: number;
  tenderAndToysIncluded: string[];

  // 04 Flag, Classification, VAT & Berth
  flagState: string; // e.g., Malta, UK Red Ensign, Cayman Islands, Marshall Islands, South Africa (SAMSA)
  classificationSociety: 'LLOYDS' | 'RINA' | 'ABS' | 'DNV' | 'BUREAU_VERITAS' | 'NONE_CE_RCD';
  codingStatus: 'PRIVATE_PLEASURE' | 'COMMERCIAL_MCA_LY3_REG' | 'DUAL_USE';
  vatStatus: 'EU_VAT_PAID' | 'UK_VAT_PAID' | 'VAT_NOT_PAID_EX_VAT' | 'EU_TEMPORARY_ADMISSION';
  currentLyingPortAndCountry: string;
  berthIncludedOrTransferable: boolean;
  berthLeaseExpiryYear?: number;
  annualCharterRevenueGross?: number;

  // 05 Due-Diligence Records Held on File (Feeds Readiness Meter)
  recordsOnFile: {
    certificateOfRegistryAndBuilderCert: boolean;
    vatPaidInvoiceOrCustomsProof: boolean;
    recentOutOfWaterHullAndEngineSurvey: boolean; // Within 12 months
    classCertificatesAndMaintenanceLogs: boolean;
    transcriptOfRegisterNoLiens: boolean;
  };
}

/**
 * 03 / CLASSIC CARS — Complete Collector Provenance, Originality & Import Fields
 */
export interface ClassicCarSellerFields extends BaseSellerIntake {
  assetCategory: 'CLASSIC_CAR';
  // 01 Core Identity & Specification
  marque: string;
  modelAndVariant: string;
  coachbuilder?: string;
  modelYear: number;
  productionNumberOfTotal?: string; // e.g., "1 of 249 built"
  collectorEra: 'PRE_WAR' | 'POST_WAR_1945_1969' | 'GOLDEN_ERA_1970_1989' | 'YOUNGTIMER_1990_2005' | 'HOMOLOGATION_SPECIAL';
  steeringConfiguration: 'LHD' | 'RHD';
  exteriorColorFactoryCode: string;
  interiorTrimMaterialAndCode: string;
  engineDisplacementCC: number;
  transmissionType: 'MANUAL' | 'AUTOMATED_MANUAL_F1' | 'AUTOMATIC';
  odometerReading: number;
  odometerUnit: 'KM' | 'MILES';
  odometerVerified: boolean;

  // 02 Originality, Matching Numbers & Certification
  matchingNumbersEngine: 'VERIFIED_MATCHING' | 'PERIOD_CORRECT_REPLACEMENT' | 'UNVERIFIED';
  matchingNumbersGearbox: 'VERIFIED_MATCHING' | 'PERIOD_CORRECT_REPLACEMENT' | 'UNVERIFIED';
  matchingColorsSpec: boolean;
  factoryCertification:

    | 'FERRARI_CLASSICHE_RED_BOOK' | 'PORSCHE_COA_CLASSIC_TECHNICAL'
    | 'ASTON_MARTIN_HERITAGE' | 'MERCEDES_CLASSIC_EXPERTISE'
    | 'FIA_HISTORIC_TECHNICAL_PASSPORT' | 'NONE';
  concoursOrRaceHistory?: string;

  // 03 Condition, Restoration & Registration
  conditionGrade: 'CONCOURS_1' | 'EXCELLENT_2' | 'DRIVER_3' | 'PRESERVATION_UNRESTORED' | 'RESTORATION_PROJECT';
  restorationSummaryAndSpecialist?: string;
  currentRegistrationCountry: string; // UK V5C, EU CoC/Carte Grise, SA eNaTIS
  importTaxesPaidInCurrentJurisdiction: boolean;
  qualifiesForOver30YrHistoricTaxRelief: boolean;
  currentStorageLocation: string;
  includedAccessories: string[]; // Original tool roll, owner's pouch, spare keys, hardtop, fitted luggage

  // 04 Due-Diligence Records Held on File (Feeds Readiness Meter)
  recordsOnFile: {
    registrationTitleDocument: boolean; // V5C / eNaTIS / EU Title
    chassisAndEngineNumberVerification: boolean;
    factoryHeritageOrBuildSheetCertificate: boolean;
    chronologicalServiceAndRestorationInvoices: boolean;
    hpiClearanceAndCustomsDutyProof: boolean;
  };
}

export const mandateCategories = ["PROPERTY", "YACHT", "CLASSIC_CAR"] as const;
export type MandateCategory = typeof mandateCategories[number];
export const mandateNames = { PROPERTY: "Property", YACHT: "Yachts", CLASSIC_CAR: "Classic Cars" } as const;
export const mandateCurrencies = ["GBP", "EUR", "ZAR", "USD"] as const;
export const mandateSteps = ["01 Core Identity", "02 Technical & Structural Specs", "03 Legal, Tax & Provenance", "04 Financial & Commercial Terms"] as const;
export type Measure = "area" | "length" | "distance";
export const alternateUnits = { area: { label: "Area units", primary: "sqm", alternate: "sq ft", factor: 0.09290304 }, length: { label: "Length units", primary: "m", alternate: "ft", factor: 0.3048 }, distance: { label: "Odometer units", primary: "km", alternate: "miles", factor: 1.609344 } } as const;
export type MandateField = {
 label: string; step: number; kind: "choice" | "text" | "list" | "boolean" | "money" | "number";
 options?: readonly string[]; min?: number; max?: number; integer?: boolean; measure?: Measure; help?: string; required?: boolean;
};
type AssetFields<T> = Record<Exclude<keyof T, keyof BaseSellerIntake | "recordsOnFile" | "odometerUnit">, MandateField>;

const commonFields: Record<Exclude<keyof BaseSellerIntake, "assetCategory"> | "saleTiming" | "assetLocation" | "guidePriceUpper", MandateField> = {
 jurisdiction: {"label": "Jurisdiction region", "step": 0, "kind": "choice", "options": ["UK", "EU_MALTA", "SOUTH_AFRICA", "OTHER"], "required": true},
 askingPrice: {"label": "Asking price", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
 currency: {"label": "Currency", "step": 3, "kind": "choice", "options": ["GBP", "EUR", "ZAR", "USD"], "required": true},
 priceDisplayMode: {"label": "Price display mode", "step": 3, "kind": "choice", "options": ["EXACT", "GUIDE_RANGE", "POA"], "required": true},
 mandateAuthorityType: {"label": "Mandate authority type", "step": 0, "kind": "choice", "options": ["SOLE_EXCLUSIVE", "JOINT_AGENCY", "DIRECT_OWNER_BRIEF", "REPRESENTATIVE"]},
 sellerTaxResidency: {"label": "Seller tax residency", "step": 2, "kind": "choice", "options": ["DOMESTIC", "EU_EEA", "NON_RESIDENT"]},
 encumbrancesOrFinance: {"label": "Finance, encumbrances or ownership structure", "step": 2, "kind": "choice", "options": ["UNENCUMBERED", "ACTIVE_MORTGAGE_OR_LIEN", "CORPORATE_SPV_HELD"]},
 preferredLanguage: {"label": "Preferred language", "step": 0, "kind": "choice", "options": ["EN", "AF"]},
 saleTiming: {"label": "Sale timing", "step": 3, "kind": "text", "max": 140, "required": true},
 assetLocation: {"label": "Asset location", "step": 0, "kind": "text", "max": 140, "required": true},
 guidePriceUpper: {"label": "Guide price upper", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
};

const propertyFields: AssetFields<PropertySellerFields> = {
 propertyStyle: {"label": "Property style", "step": 0, "kind": "choice", "options": ["COASTAL_VILLA", "PENTHOUSE_APARTMENT", "TOWNHOUSE_MEWS", "COUNTRY_ESTATE", "WINE_OR_GAME_FARM", "COMMERCIAL_OFFICE", "INDUSTRIAL_LOGISTICS", "DEVELOPMENT_LAND"]},
 country: {"label": "Country", "step": 0, "kind": "text", "max": 140},
 regionOrCity: {"label": "Region or city", "step": 0, "kind": "text", "max": 140},
 suburbOrPostcode: {"label": "Suburb or postcode", "step": 0, "kind": "text", "max": 140, "help": "Do not enter the street address."},
 isSpecialDesignatedAreaMalta: {"label": "Malta Special Designated Area status reported", "step": 2, "kind": "boolean", "help": "Confirm the designation and acquisition route with a Malta notary."},
 tenureType: {"label": "Tenure type", "step": 2, "kind": "choice", "options": ["FREEHOLD_FULL_TITLE", "LEASEHOLD", "SHARE_OF_FREEHOLD", "COMMONHOLD", "SECTIONAL_TITLE", "SHARE_BLOCK", "LIFE_RIGHTS", "USUFRUCT", "EMPHYTEUSIS"]},
 unexpiredLeaseYears: {"label": "Unexpired lease years", "step": 2, "kind": "number", "min": 0, "max": 9999, "integer": true},
 annualGroundRent: {"label": "Annual ground rent", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
 annualServiceChargeOrLevies: {"label": "Annual service charge or levies", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
 annualMunicipalRatesTax: {"label": "Annual municipal rates tax", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
 heritageOrListedStatus: {"label": "Heritage or listed status", "step": 2, "kind": "choice", "options": ["NONE", "UK_GRADE_I", "UK_GRADE_II", "HERITAGE_PROTECTED"]},
 internalAreaSqm: {"label": "Internal area", "step": 1, "kind": "number", "min": 0, "max": 100000000, "measure": "area"},
 erfOrPlotSizeSqm: {"label": "Erf or plot size", "step": 1, "kind": "number", "min": 0, "max": 100000000, "measure": "area"},
 bedrooms: {"label": "Bedrooms", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 bathrooms: {"label": "Bathrooms", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 receptionRooms: {"label": "Reception rooms", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 garagingOrParkingSpaces: {"label": "Garaging or parking spaces", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 yearBuilt: {"label": "Year built", "step": 1, "kind": "number", "min": 1, "max": 2300, "integer": true},
 lastMajorRenovationYear: {"label": "Last major renovation year", "step": 1, "kind": "number", "min": 1700, "max": 2300, "integer": true},
 epcEnergyRating: {"label": "EPC / energy rating", "step": 2, "kind": "choice", "options": ["A", "B", "C", "D", "E", "F", "G", "EXEMPT"]},
 offGridAndSecurityFeatures: {"label": "Off-grid and security features", "step": 1, "kind": "list"},
 occupancyStatus: {"label": "Occupancy status", "step": 3, "kind": "choice", "options": ["OWNER_OCCUPIED", "VACANT_POSSESSION", "TENANTED_LEASED"]},
 grossAnnualRentalIncome: {"label": "Gross annual rental income", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
 netOperatingIncomeNOI: {"label": "Annual net operating income (NOI)", "step": 3, "kind": "money", "min": -100000000000, "max": 100000000000},
 netInitialYieldPercent: {"label": "Net initial yield (%)", "step": 3, "kind": "number", "min": -100000, "max": 100000},
};

const yachtFields: AssetFields<YachtSellerFields> = {
 yachtType: {"label": "Yacht type", "step": 0, "kind": "choice", "options": ["MOTOR_YACHT", "SAILING_YACHT", "EXPLORER_EXPEDITION", "CATAMARAN", "CLASSIC_GENTLEMANS_YACHT"]},
 builderShipyard: {"label": "Builder shipyard", "step": 0, "kind": "text", "max": 140},
 modelOrSeries: {"label": "Model or series", "step": 0, "kind": "text", "max": 140},
 navalArchitect: {"label": "Naval architect", "step": 0, "kind": "text", "max": 140},
 interiorDesigner: {"label": "Interior designer", "step": 0, "kind": "text", "max": 140},
 buildYear: {"label": "Build year", "step": 0, "kind": "number", "min": 1700, "max": 2300, "integer": true},
 lastRefitYear: {"label": "Last refit year", "step": 1, "kind": "number", "min": 1700, "max": 2300, "integer": true},
 refitScopeSummary: {"label": "Refit scope summary", "step": 1, "kind": "text", "max": 550},
 loaMeters: {"label": "Length overall (LOA)", "step": 1, "kind": "number", "min": 0, "max": 100000000, "measure": "length"},
 beamMeters: {"label": "Beam", "step": 1, "kind": "number", "min": 0, "max": 100000000, "measure": "length"},
 draftMeters: {"label": "Draft", "step": 1, "kind": "number", "min": 0, "max": 100000000, "measure": "length"},
 grossTonnageGT: {"label": "Gross tonnage (GT)", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 hullMaterial: {"label": "Hull material", "step": 1, "kind": "choice", "options": ["GRP_COMPOSITE", "STEEL", "ALUMINIUM", "CARBON_FIBRE", "WOOD_COLD_MOLDED"]},
 superstructureMaterial: {"label": "Superstructure material", "step": 1, "kind": "text", "max": 140},
 hullConfiguration: {"label": "Hull configuration", "step": 1, "kind": "choice", "options": ["DISPLACEMENT", "SEMI_DISPLACEMENT", "PLANING", "MULTIHULL"]},
 enginesMakeAndModel: {"label": "Engine make and model", "step": 1, "kind": "text", "max": 140},
 engineHoursPort: {"label": "Engine hours port", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 engineHoursStarboard: {"label": "Engine hours starboard", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 cruisingSpeedKnots: {"label": "Cruising speed knots", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 maxSpeedKnots: {"label": "Max speed knots", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 rangeNauticalMiles: {"label": "Range (nautical miles)", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 fuelCapacityLitres: {"label": "Fuel capacity litres", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 freshWaterCapacityLitres: {"label": "Fresh water capacity litres", "step": 1, "kind": "number", "min": 0, "max": 100000000},
 stabilizers: {"label": "Stabilizers", "step": 1, "kind": "choice", "options": ["ZERO_SPEED_FIN", "GYRO", "UNDERWAY_ONLY", "NONE"]},
 guestCabins: {"label": "Guest cabins", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 guestBerths: {"label": "Guest berths", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 crewCabins: {"label": "Crew cabins", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 crewBerths: {"label": "Crew berths", "step": 1, "kind": "number", "min": 0, "max": 1000, "integer": true},
 tenderAndToysIncluded: {"label": "Tender and toys included", "step": 1, "kind": "list"},
 flagState: {"label": "Flag state", "step": 2, "kind": "text", "max": 140},
 classificationSociety: {"label": "Classification society", "step": 2, "kind": "choice", "options": ["LLOYDS", "RINA", "ABS", "DNV", "BUREAU_VERITAS", "NONE_CE_RCD"]},
 codingStatus: {"label": "Coding status", "step": 2, "kind": "choice", "options": ["PRIVATE_PLEASURE", "COMMERCIAL_MCA_LY3_REG", "DUAL_USE"]},
 vatStatus: {"label": "VAT / customs status", "step": 2, "kind": "choice", "options": ["EU_VAT_PAID", "UK_VAT_PAID", "VAT_NOT_PAID_EX_VAT", "EU_TEMPORARY_ADMISSION"], "help": "Select the reported position. Documentary review follows separately."},
 currentLyingPortAndCountry: {"label": "Current port and country", "step": 0, "kind": "text", "max": 140},
 berthIncludedOrTransferable: {"label": "Berth included or transferable", "step": 3, "kind": "boolean"},
 berthLeaseExpiryYear: {"label": "Berth lease expiry year", "step": 3, "kind": "number", "min": 1700, "max": 2300, "integer": true, "help": "Use the expiry stated in the berth agreement."},
 annualCharterRevenueGross: {"label": "Annual charter revenue gross", "step": 3, "kind": "money", "min": 0, "max": 100000000000},
};

const carFields: AssetFields<ClassicCarSellerFields> = {
 marque: {"label": "Marque", "step": 0, "kind": "text", "max": 140},
 modelAndVariant: {"label": "Model and variant", "step": 0, "kind": "text", "max": 140},
 coachbuilder: {"label": "Coachbuilder", "step": 0, "kind": "text", "max": 140},
 modelYear: {"label": "Model year", "step": 0, "kind": "number", "min": 1700, "max": 2300, "integer": true},
 productionNumberOfTotal: {"label": "Production number or series total", "step": 0, "kind": "text", "max": 140},
 collectorEra: {"label": "Collector era", "step": 0, "kind": "choice", "options": ["PRE_WAR", "POST_WAR_1945_1969", "GOLDEN_ERA_1970_1989", "YOUNGTIMER_1990_2005", "HOMOLOGATION_SPECIAL"]},
 steeringConfiguration: {"label": "Steering configuration", "step": 1, "kind": "choice", "options": ["LHD", "RHD"]},
 exteriorColorFactoryCode: {"label": "Exterior color factory code", "step": 1, "kind": "text", "max": 140},
 interiorTrimMaterialAndCode: {"label": "Interior trim material and code", "step": 1, "kind": "text", "max": 140},
 engineDisplacementCC: {"label": "Engine displacement (cc)", "step": 1, "kind": "number", "min": 0, "max": 30000, "integer": true},
 transmissionType: {"label": "Transmission type", "step": 1, "kind": "choice", "options": ["MANUAL", "AUTOMATED_MANUAL_F1", "AUTOMATIC"]},
 odometerReading: {"label": "Odometer reading", "step": 1, "kind": "number", "min": 0, "max": 100000000, "measure": "distance"},
 odometerVerified: {"label": "Odometer verified", "step": 2, "kind": "boolean"},
 matchingNumbersEngine: {"label": "Matching numbers engine", "step": 2, "kind": "choice", "options": ["VERIFIED_MATCHING", "PERIOD_CORRECT_REPLACEMENT", "UNVERIFIED"]},
 matchingNumbersGearbox: {"label": "Matching numbers gearbox", "step": 2, "kind": "choice", "options": ["VERIFIED_MATCHING", "PERIOD_CORRECT_REPLACEMENT", "UNVERIFIED"]},
 matchingColorsSpec: {"label": "Matching colors spec", "step": 2, "kind": "boolean"},
 factoryCertification: {"label": "Factory certification", "step": 2, "kind": "choice", "options": ["FERRARI_CLASSICHE_RED_BOOK", "PORSCHE_COA_CLASSIC_TECHNICAL", "ASTON_MARTIN_HERITAGE", "MERCEDES_CLASSIC_EXPERTISE", "FIA_HISTORIC_TECHNICAL_PASSPORT", "NONE"]},
 concoursOrRaceHistory: {"label": "Concours or race history", "step": 2, "kind": "text", "max": 550},
 conditionGrade: {"label": "Condition grade", "step": 1, "kind": "choice", "options": ["CONCOURS_1", "EXCELLENT_2", "DRIVER_3", "PRESERVATION_UNRESTORED", "RESTORATION_PROJECT"]},
 restorationSummaryAndSpecialist: {"label": "Restoration summary and specialist", "step": 1, "kind": "text", "max": 550},
 currentRegistrationCountry: {"label": "Current registration country", "step": 2, "kind": "text", "max": 140},
 importTaxesPaidInCurrentJurisdiction: {"label": "Import taxes paid in current jurisdiction", "step": 2, "kind": "boolean"},
 qualifiesForOver30YrHistoricTaxRelief: {"label": "Historic import-tax relief confirmed by adviser", "step": 2, "kind": "boolean", "help": "Age alone does not establish eligibility. Keep the adviser’s classification or ruling for separate review."},
 currentStorageLocation: {"label": "Current storage location", "step": 0, "kind": "text", "max": 140, "help": "Country and area only. Keep the exact storage address private."},
 includedAccessories: {"label": "Included accessories", "step": 1, "kind": "list"},
};

export const mandateRecords = {
 PROPERTY: {
  titleDeedOrLandRegistryExtract: "Title deed or land registry extract",
  approvedArchitecturalPlans: "Approved architectural plans",
  epcAndComplianceCertificates: "Energy and compliance certificates",
  bodyCorporateOrHOAFinancials: "Body corporate or HOA financials",
  verifiedRentalAndExpenseLedger: "Rental and expense ledger",
 },
 YACHT: {
  certificateOfRegistryAndBuilderCert: "Certificate of registry and builder certificate",
  vatPaidInvoiceOrCustomsProof: "VAT invoice or customs evidence",
  recentOutOfWaterHullAndEngineSurvey: "Out-of-water hull and engine survey within 12 months",
  classCertificatesAndMaintenanceLogs: "Class certificates and maintenance logs",
  transcriptOfRegisterNoLiens: "Register transcript and lien evidence",
 },
 CLASSIC_CAR: {
  registrationTitleDocument: "Registration or title document",
  chassisAndEngineNumberVerification: "Chassis and engine number verification record",
  factoryHeritageOrBuildSheetCertificate: "Factory heritage certificate or build sheet",
  chronologicalServiceAndRestorationInvoices: "Chronological service and restoration invoices",
  hpiClearanceAndCustomsDutyProof: "Lien clearance and customs duty proof",
 },
} as const satisfies { PROPERTY: Record<keyof PropertySellerFields["recordsOnFile"], string>; YACHT: Record<keyof YachtSellerFields["recordsOnFile"], string>; CLASSIC_CAR: Record<keyof ClassicCarSellerFields["recordsOnFile"], string> };

const byCategory = { PROPERTY: propertyFields, YACHT: yachtFields, CLASSIC_CAR: carFields };
export function mandateFields(category: MandateCategory): [string, MandateField][] {
 return Object.entries({ ...commonFields, ...byCategory[category] });
}

// A draft may omit unknown particulars. Publication still requires practitioner verification.
type DraftCommon = Pick<BaseSellerIntake, "jurisdiction" | "currency" | "priceDisplayMode"> & {
 saleTiming: string; assetLocation: string; guidePriceUpper?: number; referenceRateDate?: string;
};
type Draft<T extends BaseSellerIntake & { recordsOnFile: object }> =
 DraftCommon & Pick<T, "assetCategory" | "recordsOnFile"> & Partial<Omit<T, "assetCategory" | "recordsOnFile" | keyof DraftCommon>>;
export type AssetMandateDraft = Draft<PropertySellerFields> | Draft<YachtSellerFields> | Draft<ClassicCarSellerFields>;

function fieldSchema(field: MandateField) {
 if (field.kind === "choice") return z.string().refine(value => field.options?.includes(value), "Select a supported option.");
 if (field.kind === "boolean") return z.boolean();
 if (field.kind === "list") return z.array(z.string().trim().min(1).max(120)).max(12);
 if (field.kind === "text") return z.string().trim().min(1).max(field.max ?? 140);
 const bounded = z.number().min(field.min ?? 0).max(field.max ?? 100000000);
 return field.integer ? bounded.int() : bounded;
}
function draftBranch(category: MandateCategory) {
 return z.strictObject({
  ...Object.fromEntries(mandateFields(category).map(([key, field]) => [key, field.required ? fieldSchema(field) : fieldSchema(field).optional()])),
  assetCategory: z.literal(category),
  recordsOnFile: z.strictObject(Object.fromEntries(Object.keys(mandateRecords[category]).map(key => [key, z.boolean()]))),
  referenceRateDate: z.string().date().optional(),
  ...(category === "CLASSIC_CAR" ? { odometerUnit: z.literal("KM").optional() } : {}),
 });
}
export const assetMandateIntakeSchema = z.discriminatedUnion("assetCategory", [
 draftBranch("PROPERTY"), draftBranch("YACHT"), draftBranch("CLASSIC_CAR"),
]).transform(data => data as AssetMandateDraft).superRefine((data, ctx) => {
 const issue = (key: string, message: string) => ctx.addIssue({ code: "custom", path: [key], message });
 if (data.priceDisplayMode !== "POA" && !(data.askingPrice && data.askingPrice > 0)) issue("askingPrice", "Enter a positive asking price or lower guide price.");
 if (data.priceDisplayMode === "GUIDE_RANGE" && !(data.guidePriceUpper && data.guidePriceUpper > (data.askingPrice ?? 0))) issue("guidePriceUpper", "The upper guide price must exceed the lower guide price.");
 if (data.priceDisplayMode !== "GUIDE_RANGE" && data.guidePriceUpper !== undefined) issue("guidePriceUpper", "An upper guide price is available only for a guide range.");
 if (data.priceDisplayMode === "POA" && data.askingPrice !== undefined) issue("askingPrice", "Price on application omits the asking price.");
 if (data.assetCategory === "PROPERTY" && data.unexpiredLeaseYears !== undefined && data.tenureType !== "LEASEHOLD") issue("unexpiredLeaseYears", "Enter unexpired years only for a leasehold.");
 if (data.assetCategory === "YACHT") {
  if (data.buildYear && data.lastRefitYear && data.lastRefitYear < data.buildYear) issue("lastRefitYear", "Refit year cannot be earlier than build year.");
  if (data.maxSpeedKnots !== undefined && data.cruisingSpeedKnots !== undefined && data.maxSpeedKnots < data.cruisingSpeedKnots) issue("maxSpeedKnots", "Maximum speed cannot be below cruising speed.");
  if (data.berthLeaseExpiryYear !== undefined && data.berthIncludedOrTransferable !== true) issue("berthLeaseExpiryYear", "Confirm berth inclusion or transferability before entering a lease expiry.");
 }
});

export const assetMandateSubmissionSchema = z.strictObject({ details: assetMandateIntakeSchema, acknowledgement: z.literal(true) });

export function recordsReadiness(category: MandateCategory, declared: Record<string, boolean>, verified: Record<string, boolean> = {}) {
 const keys = Object.keys(mandateRecords[category]);
 const count = (record: Record<string, boolean>) => keys.filter(key => record[key] === true).length;
 const available = count(declared);
 const independent = count(verified);
 return { available, verified: independent, total: keys.length, availablePercent: 100 * available / keys.length, verifiedPercent: 100 * independent / keys.length };
}

export function mandateCategoryFromSlug(value?: string | null): MandateCategory {
 return value === "yachts" ? "YACHT" : value === "classic-cars" ? "CLASSIC_CAR" : "PROPERTY";
}
export function mandateEnquiryRoute(category: MandateCategory) {
 if (category === "PROPERTY") return { interest: "marketing" as const };
 return { interest: "luxury-assets" as const, assetCategory: category === "YACHT" ? "yachts" as const : "classic-cars" as const, assetIntent: "offer" as const };
}
const optionLabels: Record<string, string> = {
 UK:"United Kingdom", EU_MALTA:"Malta / European Union", SOUTH_AFRICA:"South Africa", EU_EEA:"EU / EEA",
 POA:"Price on application", EXACT:"Exact asking price", GUIDE_RANGE:"Guide range",
 EN:"English", AF:"Afrikaans", GRP_COMPOSITE:"GRP composite", COMMERCIAL_MCA_LY3_REG:"Commercial MCA LY3 / REG",
 NONE_CE_RCD:"No class society / CE RCD", EU_VAT_PAID:"EU VAT-paid", UK_VAT_PAID:"UK VAT-paid",
 VAT_NOT_PAID_EX_VAT:"VAT not paid / ex VAT", EU_TEMPORARY_ADMISSION:"EU Temporary Admission",
 DIRECT_OWNER_BRIEF:"Direct owner brief", JOINT_AGENCY:"Joint agency", SOLE_EXCLUSIVE:"Sole / exclusive",
 FREEHOLD_FULL_TITLE:"Freehold / full title", FERRARI_CLASSICHE_RED_BOOK:"Ferrari Classiche Red Book",
 FIA_HISTORIC_TECHNICAL_PASSPORT:"FIA Historic Technical Passport", VERIFIED_MATCHING:"Verified matching",
};
export function mandateOptionLabel(value: string) {
 return optionLabels[value] ?? (/^[A-Z]{1,4}$/.test(value) ? value : value.toLowerCase().replaceAll("_", " ").replace(/^./, c => c.toUpperCase()));
}

export function readMandateForm(form: FormData) {
 const selected = z.enum(mandateCategories).safeParse(form.get("mandateCategory"));
 if (!selected.success) return selected;
 const category = selected.data;
 const entries: Record<string, unknown> = {
  assetCategory: category,
  recordsOnFile: Object.fromEntries(Object.keys(mandateRecords[category]).map(key => [key, form.has(`record-${key}`)])),
 };
 for (const [key, field] of mandateFields(category)) {
  const value = form.get(`mandate-${key}`);
  if (typeof value !== "string" || value.trim() === "") continue;
  if (field.kind === "number" || field.kind === "money") {
   const factor = field.measure && form.get(`unit-${field.measure}`) === "alternate" ? alternateUnits[field.measure].factor : 1;
   entries[key] = roundedAmount(Number(value) * factor, field.kind === "money" ? 2 : 8);
  } else if (field.kind === "boolean") {
   entries[key] = value === "true" ? true : value === "false" ? false : value;
  } else if (field.kind === "list") {
   entries[key] = value.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
  } else {
   entries[key] = value;
  }
 }
 if (category === "CLASSIC_CAR" && entries.odometerReading !== undefined) entries.odometerUnit = "KM";
 if (form.get("mandate-referenceRateDate")) entries.referenceRateDate = form.get("mandate-referenceRateDate");
 return assetMandateIntakeSchema.safeParse(entries);
}

export function roundedAmount(value: number, places: number) {
 return Number(value.toFixed(places));
}

export function mandateNotification(details: AssetMandateDraft) {
 const values: Record<string, unknown> = details;
 const lines = mandateFields(details.assetCategory).flatMap(([key, field]) => {
  const value = values[key];
  if (value === undefined) return [];
  const unit = field.kind === "money" ? details.currency : field.measure ? alternateUnits[field.measure].primary : "";
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : field.kind === "choice" ? mandateOptionLabel(String(value)) : Array.isArray(value) ? value.join(", ") : String(value);
  return [`${field.label}: ${display}${unit ? " " + unit : ""}`];
 });
 const available = Object.entries(mandateRecords[details.assetCategory]).filter(([key]) => (details.recordsOnFile as Record<string, boolean>)[key]).map(([, label]) => label);
 return [
  `Asset category: ${mandateNames[details.assetCategory]}`,
  ...lines,
  ...(details.referenceRateDate ? [`Reference FX date used in brief: ${details.referenceRateDate}`] : []),
  `Seller-reported records held (${available.length}/5): ${available.join("; ") || "None selected"}`,
  "Independently verified records: none at intake.",
 ].join("\n");
}
