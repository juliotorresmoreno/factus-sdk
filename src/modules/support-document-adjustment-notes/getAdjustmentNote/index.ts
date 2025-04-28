import { ApiConfig, ErrorResponse } from "@/types/api";
import { ApiError } from "@/error";
import { GetAdjustmentNoteResponse } from "./response";

export async function getAdjustmentNote(
  config: ApiConfig,
  noteId: string
): Promise<GetAdjustmentNoteResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/adjustment-notes/${noteId}`);

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
    );
  }

  return await response.json();
}
