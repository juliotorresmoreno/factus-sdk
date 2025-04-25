import { ApiConfig } from "@/types/api";
import { DeleteUnvalidatedCreditNoteResponse } from "./response";

export async function deleteUnvalidatedCreditNote(
  config: ApiConfig,
  noteId: string
): Promise<DeleteUnvalidatedCreditNoteResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/credit-notes/reference/${noteId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error deleting credit note: ${error}`);
  }

  return res.json();
}
