export interface SupportDocumentRequest {
  reference_code: string;
  numbering_range_id?: string;
  payment_method_code?: string;
  observation?: string;
  provider: Provider;
  items: Array<Item>;
}

interface Provider {
  identification_document_id: number;
  identification: string;
  dv?: number;
  trade_name?: string;
  names: string;
  address: string;
  email: string;
  phone?: string;
  country_code: string;
  municipality_id?: number;
  is_resident?: number;
}

interface Item {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: number;
  price: number;
  unit_measure_id: number;
  standard_code_id: number;
  withholding_taxes?: Array<WithholdingTax>;
}

interface WithholdingTax {
  code: string;
  withholding_tax_rate: string;
}
