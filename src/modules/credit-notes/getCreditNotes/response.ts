interface CreditNote {
  id: number;
  api_client_name: string;
  reference_code: string | null;
  number: string;
  identification: string;
  graphic_representation_name: string;
  company: string;
  trade_name: string | null;
  names: string;
  email: string;
  total: string;
  status: number;
  errors: string[];
  send_email: number;
  created_at: string;
}

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
}

export interface GetCreditNotesResponse {
  status: string;
  message: string;
  data: {
    data: CreditNote[];
    pagination: Pagination;
  };
}
