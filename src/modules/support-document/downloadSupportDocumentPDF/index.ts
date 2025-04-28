import { ApiConfig, ErrorResponse } from "@/types/api";
import { DownloadSupportDocumentPDFResponse } from "./response";
import { ApiError } from "@/error";

export async function downloadSupportDocumentPDF(
  config: ApiConfig,
  documentId: string
): Promise<DownloadSupportDocumentPDFResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/support-documents/download-pdf/${documentId}`;

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new ApiError(
      response.status,
      error.message ?? "Error processing request",
      error.data
    );
  }

  return await response.json();
}
