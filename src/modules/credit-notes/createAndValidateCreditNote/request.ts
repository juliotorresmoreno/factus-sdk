export interface CreateAndValidateCreditNoteRequest {
  numbering_range_id?: number;
  correction_concept_code: number;
  customization_id: number;
  bill_id: number;
  reference_code: string;
  payment_method_code: string;
  observation?: string;
  items: CreditNoteItem[];
}

export interface CreditNoteItem {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: number;
  price: number;
  tax_rate: string;
  unit_measure_id: number;
  standard_code_id: number;
  is_excluded: 0 | 1;
  tribute_id: number;
  withholding_taxes?: WithholdingTax[];
}

export interface WithholdingTax {
  code: string;
  withholding_tax_rate: number;
}
