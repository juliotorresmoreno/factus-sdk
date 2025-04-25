export interface DownloadSupportDocumentXMLResponse {
  status: string;
  message: string;
  data: {
    file_name: string;
    xml_base_64_encoded: string;
  };
}
