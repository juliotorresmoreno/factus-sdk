import { ApiConfig } from "@/types/api";
import { AcceptTacitApprovalResponse } from "./response";

export type AcceptTacitApprovalPayload = {
  identification_document_code: string;
  identification: string;
  dv: string;
  first_name: string;
  last_name: string;
  job_title: string;
  organization_department: string;
};

export async function acceptTacitApproval(
  config: ApiConfig,
  invoiceId: string,
  eventType: string,
  payload: AcceptTacitApprovalPayload
): Promise<AcceptTacitApprovalResponse> {
  const token = await config.getToken();
  const url = `${config.getUrl()}/v1/bills/radian/events/update/${invoiceId}/${eventType}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Accept Tacit Approval failed: ${res.status} - ${error}`);
  }

  return await res.json();
}
