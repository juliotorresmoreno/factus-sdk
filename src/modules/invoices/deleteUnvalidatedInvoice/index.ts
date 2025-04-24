import { ApiConfig } from "@/types/api";
import { DeleteUnvalidatedInvoiceResponse } from "./response";

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
    const error = await res.text();
    throw new Error(`Delete invoice failed: ${res.status} - ${error}`);
  }

  return await res.json();
}
