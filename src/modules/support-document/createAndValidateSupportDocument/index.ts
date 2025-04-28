import { ApiError } from "@/error";
import { ApiConfig, ErrorResponse } from "@/types/api";
import { SupportDocumentRequest } from "./request";
import { CreateAndValidateSupportDocumentResponse } from "./response";

export type { SupportDocumentRequest } from "./request";

export async function createAndValidateSupportDocument(
  config: ApiConfig,
  documentData: SupportDocumentRequest
): Promise<CreateAndValidateSupportDocumentResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/support-documents/validate`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error processing request",
      error.data
    );
  }

  return await res.json();
}
