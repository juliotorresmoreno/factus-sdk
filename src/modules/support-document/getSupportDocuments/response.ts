export interface GetSupportDocumentListResponse {
  status: string;
  message: string;
  data: {
    data: SupportDocument[];
    pagination: Pagination;
  };
}

export interface SupportDocument {
  id: number;
  number: string;
  api_client_name: string;
  reference_code: string;
  identification: string;
  graphic_representation_name: string;
  trade_name: string | null;
  names: string;
  email: string;
  total: string;
  status: number;
  errors: string[];
  created_at: string;
  adjustment_notes: AdjustmentNote[];
}

export interface AdjustmentNote {
  id: number;
  number: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: PaginationLink[];
}

export interface PaginationLink {
  url: string | null;
  label: string | number;
  page: number | null;
  active: boolean;
}
