import { ApiConfig, ErrorResponse } from "@/types/api";
import { GetSupportDocumentsResponse } from "./response";
import { ApiError } from "@/error";

export async function getSupportDocument(
  config: ApiConfig,
  documentId: string
): Promise<GetSupportDocumentsResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/support-documents/show/${documentId}`;

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
