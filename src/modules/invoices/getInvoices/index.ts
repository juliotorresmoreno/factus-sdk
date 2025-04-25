import { ApiConfig, ErrorResponse } from "@/types/api";
import { GetInvoiceListResponse } from "./response";
import { ApiError } from "@/error";

export type { GetInvoiceListResponse } from "./response";

export type InvoiceFilters = {
  identification?: string;
  names?: string;
  number?: string;
  prefix?: string;
  reference_code?: string;
  status?: "0" | "1";
  page?: number;
};

export async function getInvoices(
  config: ApiConfig,
  filters: InvoiceFilters = {}
): Promise<GetInvoiceListResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/bills`);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(`filter[${key}]`, value.toString());
    }
  });

  if (filters.page) {
    url.searchParams.append("page", filters.page.toString());
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error deleting unvalidated invoice",
      error.data
    );
  }

  return await res.json();
}
