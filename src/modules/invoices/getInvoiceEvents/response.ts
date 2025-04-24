export type GetInvoiceEventsResponse = {
  status: string;
  message: string;
  data: InvoiceEvent[];
};

type InvoiceEvent = {
  number: number;
  cude: string;
  event_code: string;
  event_name: string;
  effective_date: string;
  effective_time: string;
};
