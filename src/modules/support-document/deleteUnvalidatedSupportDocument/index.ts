import { ApiConfig, ErrorResponse } from "@/types/api";
import { DeleteUnvalidatedSupportDocumentResponse } from "./response";
import { ApiError } from "@/error";

export async function deleteUnvalidatedSupportDocument(
  config: ApiConfig,
  reference_code: string
): Promise<DeleteUnvalidatedSupportDocumentResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/support-documents/reference/${reference_code}`;

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new ApiError(
      response.status,
      error.message ?? "Failed to fetch support documents",
      error.data
    );
  }

  return await response.json();
}
