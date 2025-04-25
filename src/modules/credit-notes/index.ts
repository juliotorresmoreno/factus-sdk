import { GetBaseUrl, GetToken } from "@/types/api";
import { CreateAndValidateCreditNoteRequest } from "./createAndValidateCreditNote/request";
import { createAndValidateCreditNote } from "./createAndValidateCreditNote";
import { getCreditNotes } from "./getCreditNotes";
import { getCreditNote } from "./getCreditNote";
import { downloadCreditNotePDF } from "./downloadCreditNotePDF";
import { downloadCreditNoteXML } from "./downloadCreditNoteXML";
import { deleteUnvalidatedCreditNote } from "./deleteUnvalidatedCreditNote";

class CreditNotesModule {
  public readonly getToken: GetToken;
  public readonly getUrl: GetBaseUrl;

  constructor(getToken: GetToken, getUrl: GetBaseUrl) {
    this.getToken = getToken;
    this.getUrl = getUrl;
  }

  // Crear y Validar Nota Crédito
  async createAndValidateCreditNote(data: CreateAndValidateCreditNoteRequest) {
    return createAndValidateCreditNote(this, data);
  }

  // Ver Nota Crédito
  async getCreditNotes() {
    return getCreditNotes(this);
  }

  // Listar Notas Crédito
  async getCreditNote(noteId: string) {
    return getCreditNote(this, noteId);
  }

  // Descargar PDF Nota Crédito
  async downloadCreditNotePDF(noteId: string) {
    return downloadCreditNotePDF(this, noteId);
  }

  // Descargar XML Nota Crédito
  async downloadCreditNoteXML(noteId: string) {
    return downloadCreditNoteXML(this, noteId);
  }

  // Eliminar Nota Crédito no validada
  async deleteUnvalidatedCreditNote(reference_code: string) {
    return deleteUnvalidatedCreditNote(this, reference_code);
  }
}

export function createCreditNotesModule(
  getToken: GetToken,
  getUrl: GetBaseUrl
) {
  return new CreditNotesModule(getToken, getUrl);
}
