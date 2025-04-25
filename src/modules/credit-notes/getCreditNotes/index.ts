import { ApiConfig } from "@/types/api";
import { GetCreditNotesResponse } from "./response";

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
    const error = await res.text();
    throw new Error(`Error fetching credit notes: ${error}`);
  }

  return res.json();
}
