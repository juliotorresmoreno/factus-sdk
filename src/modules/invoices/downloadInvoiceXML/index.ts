import { ApiConfig, ErrorResponse } from "@/types/api";
import { DownloadInvoiceXMLResponse } from "./response";
import { ApiError } from "@/error";

export async function downloadInvoiceXML(
  config: ApiConfig,
  invoiceId: string
): Promise<DownloadInvoiceXMLResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/download-xml/${invoiceId}`;

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
