import { ApiConfig } from "@/types/api";
import { InvoiceDataRequest } from "./request";
import { InvoiceDataResponse } from "./response";

export type { InvoiceDataRequest } from "./request";

export async function createAndValidateInvoice(
  config: ApiConfig,
  invoiceData: InvoiceDataRequest
): Promise<InvoiceDataResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/validate`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Invoice creation failed: ${res.status} - ${error}`);
  }

  return await res.json();
}
