import { ApiConfig, ErrorResponse } from "@/types/api";
import { InvoiceDataRequest } from "./request";
import { InvoiceDataResponse } from "./response";
import { ApiError } from "@/error";

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
    const error: ErrorResponse = await res.json();
    throw new ApiError(
      res.status,
      error.message ?? "Error deleting unvalidated invoice",
      error.data
    );
  }

  return await res.json();
}
