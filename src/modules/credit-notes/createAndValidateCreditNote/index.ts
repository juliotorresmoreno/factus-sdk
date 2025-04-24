import { ApiConfig } from "@/types/api";
import { CreateAndValidateCreditNoteRequest } from "./request";
import { CreateAndValidateCreditNoteResponse } from "./response";

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
    const error = await res.text();
    throw new Error(`Create credit note failed: ${res.status} - ${error}`);
  }

  return res.json();
}
