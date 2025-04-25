export interface DownloadCreditNoteXMLResponse {
  status: string;
  message: string;
  data: DownloadXMLData;
}

interface DownloadXMLData {
  file_name: string;
  xml_base_64_encoded: string;
}
