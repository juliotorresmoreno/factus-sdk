import { GetBaseUrl, GetToken } from "@/types/api";

// Individual operation functions (to be implemented)
import {
  createAndValidateSupportDocument,
  SupportDocumentRequest,
} from "./createAndValidateSupportDocument";
import { getSupportDocument } from "./getSupportDocument";
import { deleteUnvalidatedSupportDocument } from "./deleteUnvalidatedSupportDocument";
import { downloadSupportDocumentPDF } from "./downloadSupportDocumentPDF";
import { downloadSupportDocumentXML } from "./downloadSupportDocumentXML";
import {
  getSupportDocuments,
  SupportDocumentFilters,
} from "./getSupportDocuments";

class SupportDocumentsModule {
  public readonly getToken: GetToken;
  public readonly getUrl: GetBaseUrl;

  constructor(getToken: GetToken, getUrl: GetBaseUrl) {
    this.getToken = getToken;
    this.getUrl = getUrl;
  }

  // Create and validate support document
  async createAndValidateSupportDocument(documentData: SupportDocumentRequest) {
    return createAndValidateSupportDocument(this, documentData);
  }

  // Get single support document
  async getSupportDocument(documentId: string) {
    return getSupportDocument(this, documentId);
  }

  // List support documents with filters
  async getSupportDocuments(filter: SupportDocumentFilters) {
    return getSupportDocuments(this, filter);
  }

  // Download PDF version
  async downloadSupportDocumentPDF(documentId: string) {
    return downloadSupportDocumentPDF(this, documentId);
  }

  // Download XML version
  async downloadSupportDocumentXML(documentId: string) {
    return downloadSupportDocumentXML(this, documentId);
  }

  // Delete unvalidated document
  async deleteUnvalidatedSupportDocument(documentId: string) {
    return deleteUnvalidatedSupportDocument(this, documentId);
  }
}

export function createSupportDocumentsModule(
  getToken: GetToken,
  getUrl: GetBaseUrl
) {
  return new SupportDocumentsModule(getToken, getUrl);
}
