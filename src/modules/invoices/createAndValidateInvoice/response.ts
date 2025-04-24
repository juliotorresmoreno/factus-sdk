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
  trade_name: string;
  company: string;
  names: string;
  address: string;
  email: string;
  phone: string;
  legal_organization: LegalOrganization;
  tribute: Tribute;
  municipality: Municipality;
};

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

type NumberingRange = {
  prefix: string;
  from: number;
  to: number;
  resolution_number: string;
  start_date: string;
  end_date: string;
  months: number;
};

type Bill = {
  id: number;
  document: {
    code: string;
    name: string;
  };
  number: string;
  reference_code: string;
  status: number;
  send_email: number;
  qr: string;
  cufe: string;
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
  payment_due_date: string | null;
  qr_image: string;
};

export type InvoiceDataResponse = {
  status: string;
  message: string;
  data: {
    company: Company;
    customer: Customer;
    numbering_range: NumberingRange;
    billing_period: any[];
    bill: Bill;
  };
};
