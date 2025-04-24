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

type NumberingRange = {
  prefix: string;
  from: number;
  to: number;
};

type InvoiceResponse = {
  status: string;
  message: string;
  data: {
    company: Company;
    customer: Customer;
    numbering_range: NumberingRange;
  };
};
