import { ApiError } from "@/error";
import { ApiConfig, ErrorResponse } from "@/types/api";
import { AdjustmentNoteRequest } from "./request";
import { CreateAndValidateAdjustmentNoteResponse } from "./response";

export type { AdjustmentNoteRequest } from "./request";

export async function createAndValidateAdjustmentNote(
  config: ApiConfig,
  noteData: AdjustmentNoteRequest
): Promise<CreateAndValidateAdjustmentNoteResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/adjustment-notes/validate`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error creating and validating adjustment note"
    );
  }

  return await res.json();
}
