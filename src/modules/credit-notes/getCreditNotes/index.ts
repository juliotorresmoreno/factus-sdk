import { ApiConfig, ErrorResponse } from "@/types/api";
import { GetCreditNotesResponse } from "./response";
import { ApiError } from "@/error";

export async function getCreditNotes(
  config: ApiConfig
): Promise<GetCreditNotesResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/credit-notes`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

  return res.json();
}
