export interface DownloadCreditNotePDFResponse {
  status: string;
  message: string;
  data: DownloadPDFData;
}

interface DownloadPDFData {
  file_name: string;
  pdf_base_64_encoded: string;
}
