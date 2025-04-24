import { ApiConfig } from "@/types/api";
import { GetInvoiceEventsResponse } from "./response";

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
    const error = await res.text();
    throw new Error(`Get invoice events failed: ${res.status} - ${error}`);
  }

  return await res.json();
}
