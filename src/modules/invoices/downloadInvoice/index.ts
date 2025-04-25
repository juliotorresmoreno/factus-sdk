import { ApiError } from "@/error";
import { ApiConfig, ErrorResponse } from "@/types/api";

export async function downloadInvoice(
  config: ApiConfig,
  invoiceId: string
): Promise<DownloadInvoiceResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/download-pdf/${invoiceId}`;

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
      error.message ?? "Error deleting unvalidated invoice"
    );
  }

  return await res.json();
}
