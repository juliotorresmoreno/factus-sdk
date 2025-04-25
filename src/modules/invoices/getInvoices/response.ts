export interface GetInvoiceListResponse {
  status: string;
  message: string;
  data: DataWrap;
}

export interface DataWrap {
  data: Bill[];
  pagination: Pagination;
}

export interface Bill {
  id: number;
  document: Document;
  number: string;
  api_client_name: string;
  reference_code: string;
  identification: string;
  graphic_representation_name: string;
  company: string;
  trade_name: string;
  names: string;
  email: string;
  total: string;
  status: number;
  errors: string[];
  send_email: number;
  has_claim: number;
  is_negotiable_instrument: number;
  payment_form: PaymentForm;
  created_at: string | null;
  credit_notes: any[];
  debit_notes: any[];
}

export interface Document {
  code: string;
  name: string;
}

export interface PaymentForm {
  code: string;
  name: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: PageLink[];
}

export interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
  page?: number;
}
