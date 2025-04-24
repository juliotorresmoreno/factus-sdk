import { ApiConfig } from "@/types/api";

export async function getCreditNote(
  config: ApiConfig
): Promise<GetCreditNoteResponse> {
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
    throw new Error(`Create credit note failed: ${res.status} - ${error}`);
  }

  return res.json();
}
