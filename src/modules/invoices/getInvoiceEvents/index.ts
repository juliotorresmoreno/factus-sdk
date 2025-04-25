import { ApiConfig, ErrorResponse } from "@/types/api";
import { GetInvoiceEventsResponse } from "./response";
import { ApiError } from "@/error";

export async function getInvoiceEvents(
  config: ApiConfig,
  invoiceId: string
): Promise<GetInvoiceEventsResponse> {
  const token = await config.getToken();
  const url = new URL(`${config.getUrl()}/v1/bills/${invoiceId}/radian/events`);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error deleting unvalidated invoice",
      error.data
    );
  }

  return await res.json();
}
