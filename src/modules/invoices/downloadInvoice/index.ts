import { ApiConfig } from "@/types/api";

export async function downloadInvoice(
  config: ApiConfig,
  invoiceId: string
): Promise<DownloadInvoiceResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/download-pdf/${invoiceId}`;

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
