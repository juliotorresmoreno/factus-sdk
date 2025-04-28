import { ApiError } from "@/error";
import { ApiConfig, ErrorResponse } from "@/types/api";

export async function getInvoice(
  config: ApiConfig,
  invoiceId: string
): Promise<InvoiceResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/show/${invoiceId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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
