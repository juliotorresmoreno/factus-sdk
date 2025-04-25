import { ApiConfig, ErrorResponse } from "@/types/api";
import { DownloadCreditNotePDFResponse } from "./response";
import { ApiError } from "@/error";

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
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error deleting unvalidated invoice"
    );
  }

  return res.json();
}
