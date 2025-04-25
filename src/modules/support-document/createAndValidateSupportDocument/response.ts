export interface CompanyInfo {
  url_logo: string;
  nit: string;
  dv: string;
  company: string;
  name: string;
  graphic_representation_name: string;
  registration_code: string;
  economic_activity: string;
  phone: string;
  email: string;
  direction: string;
  municipality: string;
}

export interface IdentificationDocument {
  id: number;
  code: string;
  name: string;
}

export interface LegalOrganization {
  id: number;
  code: string;
  name: string;
}

export interface Tribute {
  id: number;
  code: string;
  name: string;
}

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface Municipality {
  id: number;
  code: string;
  name: string;
}

export interface ProviderInfo {
  identification: string;
  dv: string;
  graphic_representation_name: string;
  trade_name: string | null;
  names: string;
  address: string;
  email: string;
  phone: string;
  identification_document: IdentificationDocument;
  legal_organization: LegalOrganization;
  tribute: Tribute;
  country: Country;
  municipality: Municipality;
}

export interface PaymentMethod {
  code: string;
  name: string;
}

export interface SupportDocumentSummary {
  id: number;
  number: string;
  reference_code: string;
  status: number;
  qr: string;
  cuds: string;
  validated: string;
  discount_rate: string;
  discount: string;
  gross_value: string;
  taxable_amount: string;
  tax_amount: string;
  total: string;
  observation: string | null;
  errors: string[];
  created_at: string;
  qr_image: string;
  payment_method: PaymentMethod;
}

export interface UnitMeasure {
  id: number;
  code: string;
  name: string;
}

export interface StandardCode {
  id: number;
  code: string;
  name: string;
}

export interface WithholdingTaxRate {
  code: string;
  name: string;
  rate: string;
}

export interface WithholdingTax {
  tribute_code: string;
  name: string;
  value: string;
  rates: WithholdingTaxRate[];
}

export interface SupportDocumentItemResponse {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: string;
  discount: string;
  gross_value: string;
  tax_rate: string;
  taxable_amount: string;
  tax_amount: string;
  price: string;
  is_excluded: number;
  unit_measure: UnitMeasure;
  standard_code: StandardCode;
  total: number;
  withholding_taxes: WithholdingTax[];
}

export interface SimpleWithholdingTax {
  tribute_code: string;
  name: string;
  value: string;
}

export interface AdjustmentNote {
  id: number;
  number: string;
  validated: string;
}

export interface NumberingRange {
  prefix: string;
  from: number;
  to: number;
  resolution_number: string;
  start_date: string;
  end_date: string;
  months: number;
}

export interface CreateAndValidateSupportDocumentResponseData {
  company: CompanyInfo;
  provider: ProviderInfo;
  support_document: SupportDocumentSummary;
  items: SupportDocumentItemResponse[];
  withholding_taxes: SimpleWithholdingTax[];
  adjustment_notes: AdjustmentNote[];
  numbering_range: NumberingRange;
}

export interface CreateAndValidateSupportDocumentResponse {
  status: string;
  message: string;
  data: CreateAndValidateSupportDocumentResponseData;
}
