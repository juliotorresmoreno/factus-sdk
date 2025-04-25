import { ApiConfig, ErrorResponse } from "@/types/api";
import { ApiError } from "@/error";
import { GetAdjustmentNoteListResponse } from "./response";

export type AdjustmentNoteFilters = {
  identification?: string;
  names?: string;
  number?: string;
  prefix?: string;
  reference_code?: string;
  status?: "0" | "1";
  page?: number;
};

export async function getAdjustmentNotes(
  config: ApiConfig,
  filters: AdjustmentNoteFilters = {}
): Promise<GetAdjustmentNoteListResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/adjustment-notes`);

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
      error.message ?? "Failed to fetch adjustment notes"
    );
  }

  return await response.json();
}
