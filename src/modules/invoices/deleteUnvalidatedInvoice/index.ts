import { ApiConfig, ErrorResponse } from "@/types/api";
import { DeleteUnvalidatedInvoiceResponse } from "./response";
import { ApiError } from "@/error";

export async function deleteUnvalidatedInvoice(
  config: ApiConfig,
  invoiceId: string
): Promise<DeleteUnvalidatedInvoiceResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/destroy/reference/${invoiceId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
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
