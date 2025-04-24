type Company = {
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
};

type LegalOrganization = {
  id: number;
  code: string;
  name: string;
};

type Tribute = {
  id: number;
  code: string;
  name: string;
};

type Municipality = {
  id: number;
  code: string;
  name: string;
};

type Customer = {
  identification: string;
  dv: string | null;
  graphic_representation_name: string;
  trade_name: string | null;
  company: string;
  names: string;
  address: string;
  email: string | null;
  phone: string | null;
  legal_organization: LegalOrganization;
  tribute: Tribute;
  municipality: Municipality;
};

type CreditNote = {
  id: number;
  number: string;
  reference_code: string;
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
};

export type CreateAndValidateCreditNoteResponse = {
  status: string;
  message: string;
  data: {
    company: Company;
    customer: Customer;
    credit_note: CreditNote;
  };
};
