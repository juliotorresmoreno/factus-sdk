export interface GetCreditNoteResponse {
  status: string;
  message: string;
  data: CreditNoteData;
}

interface CreditNoteData {
  company: Company;
  customer: Customer;
  credit_note: CreditNote;
}

interface Company {
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

interface Customer {
  identification: string;
  dv: string;
  graphic_representation_name: string;
  trade_name: string | null;
  company: string;
  names: string;
  address: string;
  email: string;
  phone: string;
  legal_organization: LegalEntity;
  tribute: LegalEntity;
  municipality: LegalEntity;
}

interface LegalEntity {
  id: number;
  code: string;
  name: string;
}

interface CreditNote {
  id: number;
  number: string;
  reference_code: string | null;
  status: number;
  send_email: number;
  qr: string;
  cude: string;
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
}
