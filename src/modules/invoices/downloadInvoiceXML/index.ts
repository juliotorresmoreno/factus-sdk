import { ApiConfig } from "@/types/api";
import { DownloadInvoiceXMLResponse } from "./response";

export async function downloadInvoiceXML(
  config: ApiConfig,
  invoiceId: string
): Promise<DownloadInvoiceXMLResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/download-xml/${invoiceId}`;

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
