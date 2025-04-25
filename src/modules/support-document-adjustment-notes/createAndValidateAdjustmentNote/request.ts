export interface AdjustmentNoteRequest {
  reference_code: string;
  numbering_range_id?: string;
  payment_method_code?: string;
  support_document_id: number;
  correction_concept_code: string;
  observation?: string;
  items: AdjustmentItem[];
}

export interface AdjustmentItem {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: number;
  price: number;
  unit_measure_id: number;
  standard_code_id: number;
  withholding_taxes?: WithholdingTax[];
}

export interface WithholdingTax {
  code: string;
  withholding_tax_rate: string;
}
