import { ApiConfig, ErrorResponse } from "@/types/api";
import { DeleteUnvalidatedCreditNoteResponse } from "./response";
import { ApiError } from "@/error";

export async function deleteUnvalidatedCreditNote(
  config: ApiConfig,
  noteId: string
): Promise<DeleteUnvalidatedCreditNoteResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/credit-notes/reference/${noteId}`;

  const res = await fetch(url, {
    method: "DELETE",
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
