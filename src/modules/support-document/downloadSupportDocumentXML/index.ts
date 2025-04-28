import { ApiConfig, ErrorResponse } from "@/types/api";
import { DownloadSupportDocumentXMLResponse } from "./response";
import { ApiError } from "@/error";

export async function downloadSupportDocumentXML(
  config: ApiConfig,
  documentId: string
): Promise<DownloadSupportDocumentXMLResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/support-documents/download-xml/${documentId}`;

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
