// FHIR common types
export interface Period {
  start?: Date;
  end?: Date;
}

export interface Performer {
  reference: string;
  display?: string;
}

export interface EncodableConcept {
  system?: string;
  code: string;
  display?: string;
}

export interface ContactPoint {
  system?: "phone" | "email" | "fax" | "pager" | "url" | "sms" | "other";
  value: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
  rank?: number;
  period?: Period;
}

export interface Address {
  use?: "home" | "work" | "temp" | "old" | "billing";
  type?: "postal" | "physical" | "both";
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: Period;
}

export interface CommunicationPreference {
  language: EncodableConcept;
  preferred?: boolean;
}

// FHIR Meta type for meta field
export interface Meta {
  versionId?: string;
  lastUpdated?: Date;
  source?: string;
  profile?: string[];
  security?: EncodableConcept[];
  tag?: EncodableConcept[];
}

export interface DiagnosisComponent {
  condition: string;
  use: { code: string; display: string };
  rank?: number;
}

export interface EncounterLocation {
  location: { reference: string };
  status?: "planned" | "active" | "reserved" | "completed";
  period?: Period;
}

export const activeStatus = ["active", "completed"] as const;
export type ActiveStatus = (typeof activeStatus)[number];
