export type UUID = string;
export type ISODateTime = string;
export type URLString = string;

/** Plan tarifaire */
export interface Plan {
  id: UUID;
  name: string;
  slug: "free" | "pro" | "enterprise";
  description: string;
  features: PlanFeature[];
  limits: PlanLimits;
  pricing: PlanPricing;
  recommended: boolean;
}

/** Feature d'un plan */
export interface PlanFeature {
  label: string;
  included: boolean;
  detail: string | null;
}

/** Limites d'un plan */
export interface PlanLimits {
  maxProjects: number | null;
  maxDeployments: number | null;
  maxCustomDomains: number | null;
  storageGb: number;
  bandwidthGb: number;
  maintenanceIncluded: boolean;
  dedicatedInfra: boolean;
}

/** Tarification d'un plan */
export interface PlanPricing {
  monthly: number;
  yearly: number;
  currency: "EUR";
}
