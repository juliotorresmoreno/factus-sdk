type DownloadInvoiceResponse = {
  status: string
  message: string
  data: {
    file_name: string
    pdf_base_64_encoded: string
  }
}
