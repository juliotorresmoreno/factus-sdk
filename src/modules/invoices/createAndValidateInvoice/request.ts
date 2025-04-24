export interface InvoiceDataRequest {
  numbering_range_id?: number;
  reference_code: string;
  observation?: string;
  payment_form?: string; // "1" (contado) por defecto
  payment_due_date?: string; // "YYYY-MM-DD"
  payment_method_code?: string; // "10" (efectivo) por defecto
  related_documents?: RelatedDocument[];
  billing_period?: BillingPeriod;
  customer: Customer;
  items: InvoiceItem[];
}

interface RelatedDocument {
  code: string;
  issue_date: string; // "YYYY-MM-DD"
  number: string;
}

interface BillingPeriod {
  start_date: string; // "YYYY-MM-DD"
  start_time?: string; // "HH:mm:ss"
  end_date: string; // "YYYY-MM-DD"
  end_time?: string; // "HH:mm:ss"
}

interface Customer {
  identification_document_id: string;
  identification: string;
  dv?: string; // Digito de verificación, requerido si el cliente tiene NIT
  company?: string; // Razón social (si es persona jurídica)
  trade_name?: string; // Nombre comercial
  names: string; // Nombre completo del cliente
  address?: string; // Dirección
  email?: string; // Correo electrónico
  phone?: string; // Teléfono
  legal_organization_id: string;
  tribute_id: string;
  municipality_id?: string; // Solo necesario si es en Colombia
}

interface InvoiceItem {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: number;
  price: number;
  tax_rate: string; // "19.00" o "5.00", dependiendo del impuesto
  unit_measure_id: number;
  standard_code_id: number;
  is_excluded: number; // 0 si no está excluido, 1 si está excluido del IVA
  tribute_id: number;
  withholding_taxes?: WithholdingTax[];
}

interface WithholdingTax {
  code: string;
  withholding_tax_rate: string; // Porcentaje de la retención, como "7.00"
}


