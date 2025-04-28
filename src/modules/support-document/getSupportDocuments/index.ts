import { ApiConfig, ErrorResponse } from "@/types/api";
import { ApiError } from "@/error";
import { GetSupportDocumentListResponse } from "./response";

export type SupportDocumentFilters = {
  identification?: string;
  names?: string;
  number?: string;
  prefix?: string;
  reference_code?: string;
  status?: "0" | "1";
  page?: number;
};

export async function getSupportDocuments(
  config: ApiConfig,
  filters: SupportDocumentFilters = {}
): Promise<GetSupportDocumentListResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/support-documents`);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && key !== "page") {
      url.searchParams.append(`filter[${key}]`, value.toString());
    }
  });

  if (filters.page) {
    url.searchParams.append("page", filters.page.toString());
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new ApiError(
      response.status,
      error.message ?? "Error processing request",
      error.data
    );
  }

  return await response.json();
}
