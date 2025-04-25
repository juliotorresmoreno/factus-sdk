import { ApiConfig } from "@/types/api";
import { DownloadCreditNoteXMLResponse } from "./response";

export async function downloadCreditNoteXML(
  config: ApiConfig,
  noteId: string
): Promise<DownloadCreditNoteXMLResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/credit-notes/download-xml/${noteId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Could not download credit note XML: ${error}`);
  }

  return res.json();
}
