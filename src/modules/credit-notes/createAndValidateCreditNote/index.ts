import { ApiConfig, ErrorResponse } from "@/types/api";
import { CreateAndValidateCreditNoteRequest } from "./request";
import { CreateAndValidateCreditNoteResponse } from "./response";
import { ApiError } from "@/error";

export async function createAndValidateCreditNote(
  config: ApiConfig,
  payload: CreateAndValidateCreditNoteRequest
): Promise<CreateAndValidateCreditNoteResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/credit-notes/validate`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error processing request",
      error.data
    );
  }

  return res.json();
}
