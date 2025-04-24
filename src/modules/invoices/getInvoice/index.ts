import { ApiConfig } from "@/types/api";

export async function getInvoice(
  config: ApiConfig,
  invoiceId: string
): Promise<InvoiceResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/show/${invoiceId}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch invoice");
    return res.json();
  });
}
