import { ApiConfig } from "@/types/api";
import { DownloadCreditNotePDFResponse } from "./response";

export async function downloadCreditNotePDF(
  config: ApiConfig,
  noteId: string
): Promise<DownloadCreditNotePDFResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/credit-notes/download-pdf/${noteId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error downloading credit note PDF: ${error}`);
  }

  return res.json();
}
