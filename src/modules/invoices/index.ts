import { GetBaseUrl, GetToken } from "@/types/api";
import {
  acceptTacitApproval,
  AcceptTacitApprovalPayload,
} from "./acceptTacitApproval";
import {
  createAndValidateInvoice,
  InvoiceDataRequest,
} from "./createAndValidateInvoice";
import { deleteUnvalidatedInvoice } from "./deleteUnvalidatedInvoice";
import { downloadInvoice } from "./downloadInvoice";
import { downloadInvoiceXML } from "./downloadInvoiceXML";
import { getInvoice } from "./getInvoice";
import { getInvoiceEvents } from "./getInvoiceEvents";
import { getInvoices, InvoiceFilters } from "./getInvoices";

class InvoicesModule {
  public readonly getToken: GetToken;
  public readonly getUrl: GetBaseUrl;

  constructor(getToken: GetToken, getUrl: GetBaseUrl) {
    this.getToken = getToken;
    this.getUrl = getUrl;
  }

  // Crear y Validar Factura
  async createAndValidateInvoice(invoiceData: InvoiceDataRequest) {
    return createAndValidateInvoice(this, invoiceData);
  }

  // Ver Factura
  async getInvoice(invoiceId: string) {
    return getInvoice(this, invoiceId);
  }

  async getInvoices(filter: InvoiceFilters) {
    return getInvoices(this, filter);
  }

  // Descargar factura
  async downloadInvoice(invoiceId: string) {
    return downloadInvoice(this, invoiceId);
  }

  // Descargar XML
  async downloadInvoiceXML(invoiceId: string) {
    return downloadInvoiceXML(this, invoiceId);
  }

  // Eliminar factura no validada
  async deleteUnvalidatedInvoice(invoiceId: string): Promise<any> {
    return deleteUnvalidatedInvoice(this, invoiceId);
  }

  // Eventos de factura
  async getInvoiceEvents(invoiceId: string): Promise<any> {
    return getInvoiceEvents(this, invoiceId);
  }

  // Aceptación tácita (sin implementación por ahora)
  async acceptTacitApproval(
    invoiceId: string,
    eventType: string,
    payload: AcceptTacitApprovalPayload
  ) {
    return acceptTacitApproval(this, invoiceId, eventType, payload);
  }
}

export function createInvoicesModule(getToken: GetToken, getUrl: GetBaseUrl) {
  return new InvoicesModule(getToken, getUrl);
}
