export interface GetAdjustmentNoteListResponse {
  status: string;
  message: string;
  data: {
    company: Company;
    provider: Provider;
    adjustment_note: AdjustmentNote;
    items: AdjustmentItem[];
    withholding_taxes: WithholdingTax[];
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Sub-types (reused from previous implementation)
export interface Company {
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

export interface Provider {
  identification: string;
  dv: string;
  graphic_representation_name: string;
  trade_name: string | null;
  names: string;
  address: string;
  email: string;
  phone: string;
  legal_organization: {
    id: number;
    code: string;
    name: string;
  };
  tribute: {
    id: number;
    code: string;
    name: string;
  };
  municipality: {
    id: number;
    code: string;
    name: string;
  };
}

export interface AdjustmentNote {
  id: number;
  number: string;
  reference_code: string;
  status: number;
  qr: string;
  cuds: string;
  validated: string | null;
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
  payment_method: {
    code: string;
    name: string;
  };
}

export interface AdjustmentItem {
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
  unit_measure: {
    id: number;
    code: string;
    name: string;
  };
  standard_code: {
    id: number;
    code: string;
    name: string;
  };
  total: number;
  withholding_taxes: ItemWithholdingTax[];
}

export interface ItemWithholdingTax {
  tribute_code: string;
  name: string;
  value: string;
  rates: TaxRate[];
}

export interface TaxRate {
  code: string;
  name: string;
  rate: string;
}

export interface WithholdingTax {
  tribute_code: string;
  name: string;
  value: string;
}