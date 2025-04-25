import { ApiConfig, ErrorResponse } from "@/types/api";
import { ApiError } from "@/error";
import { DownloadAdjustmentNoteXMLResponse } from "./response";

export async function downloadAdjustmentNoteXML(
  config: ApiConfig,
  noteId: string
): Promise<DownloadAdjustmentNoteXMLResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/adjustment-notes/download-xml/${noteId}`;
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
      error.message ?? "Failed to fetch adjustment notes"
    );
  }

  return await response.json();
}
