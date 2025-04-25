export interface GetSupportDocumentsResponse {
  status: string;
  message: string;
  data: {
    company: Company;
    provider: Provider;
    support_document: SupportDocument;
    items: Item[];
    withholding_taxes: WithholdingTax[];
    adjustment_notes: AdjustmentNote[];
    numbering_range: NumberingRange;
  };
}

// Sub-types
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
  trade_name: string;
  names: string;
  address: string;
  email: string;
  phone: string;
  identification_document: {
    id: number;
    code: string;
    name: string;
  };
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
  country: {
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

export interface SupportDocument {
  id: number;
  number: string;
  reference_code: string;
  status: number;
  qr: string;
  cuds: string;
  validated: null | string;
  discount_rate: string;
  discount: string;
  gross_value: string;
  taxable_amount: string;
  tax_amount: string;
  total: string;
  observation: string;
  errors: string[];
  created_at: null | string;
  qr_image: string;
  payment_method: {
    code: string;
    name: string;
  };
}

export interface Item {
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
  withholding_taxes: WithholdingTax[];
}

export interface WithholdingTax {
  code?: string;
  withholding_tax_rate?: number;
}

export interface AdjustmentNote {
  // Define properties if available in other responses
  [key: string]: any;
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
