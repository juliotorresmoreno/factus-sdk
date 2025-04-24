import { GetBaseUrl, GetToken } from "@/types/api";
import { CreateAndValidateCreditNoteRequest } from "./createAndValidateCreditNote/request";
import { createAndValidateCreditNote } from "./createAndValidateCreditNote";

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
  async getCreditNote(noteId: string) {
    // Implementación pendiente
  }

  // Listar Notas Crédito
  async getCreditNotes(filter: any) {
    // Implementación pendiente
  }

  // Descargar PDF Nota Crédito
  async downloadCreditNotePDF(noteId: string) {
    // Implementación pendiente
  }

  // Descargar XML Nota Crédito
  async downloadCreditNoteXML(noteId: string) {
    // Implementación pendiente
  }

  // Eliminar Nota Crédito no validada
  async deleteUnvalidatedCreditNote(noteId: string) {
    // Implementación pendiente
  }
}

export function createCreditNotesModule(
  getToken: GetToken,
  getUrl: GetBaseUrl
) {
  return new CreditNotesModule(getToken, getUrl);
}
