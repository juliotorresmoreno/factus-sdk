import { ApiConfig, ErrorResponse } from "@/types/api";
import { ApiError } from "@/error";
import { DeleteUnvalidatedAdjustmentNoteResponse } from "./response";

export async function deleteUnvalidatedAdjustmentNote(
  config: ApiConfig,
  reference_code: string
): Promise<DeleteUnvalidatedAdjustmentNoteResponse> {
  const token = await config.getToken();
  const url = new URL(
    `${config.getUrl()}/v1/adjustment-notes/reference/${reference_code}`
  );

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
      error.message ?? "Failed to fetch adjustment notes"
    );
  }

  return await response.json();
}
