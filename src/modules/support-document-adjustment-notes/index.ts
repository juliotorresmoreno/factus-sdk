import { GetBaseUrl, GetToken } from "@/types/api";

// Individual operation functions (to be implemented)
import {
  createAndValidateAdjustmentNote,
  AdjustmentNoteRequest,
} from "./createAndValidateAdjustmentNote";
import { getAdjustmentNote } from "./getAdjustmentNote";
import { deleteUnvalidatedAdjustmentNote } from "./deleteUnvalidatedAdjustmentNote";
import { downloadAdjustmentNotePDF } from "./downloadAdjustmentNotePDF";
import { downloadAdjustmentNoteXML } from "./downloadAdjustmentNoteXML";
import {
  getAdjustmentNotes,
  AdjustmentNoteFilters,
} from "./getAdjustmentNotes";

class SupportDocumentAdjustmentNotesModule {
  public readonly getToken: GetToken;
  public readonly getUrl: GetBaseUrl;

  constructor(getToken: GetToken, getUrl: GetBaseUrl) {
    this.getToken = getToken;
    this.getUrl = getUrl;
  }

  // Create and validate adjustment note
  async createAndValidateAdjustmentNote(noteData: AdjustmentNoteRequest) {
    return createAndValidateAdjustmentNote(this, noteData);
  }

  // Get single adjustment note
  async getAdjustmentNote(noteId: string) {
    return getAdjustmentNote(this, noteId);
  }

  // List adjustment notes with filters
  async getAdjustmentNotes(filter: AdjustmentNoteFilters = {}) {
    return getAdjustmentNotes(this, filter);
  }

  // Download PDF version
  async downloadAdjustmentNotePDF(noteId: string) {
    return downloadAdjustmentNotePDF(this, noteId);
  }

  // Download XML version
  async downloadAdjustmentNoteXML(noteId: string) {
    return downloadAdjustmentNoteXML(this, noteId);
  }

  // Delete unvalidated adjustment note
  async deleteUnvalidatedAdjustmentNote(noteId: string) {
    return deleteUnvalidatedAdjustmentNote(this, noteId);
  }
}

export function createSupportDocumentAdjustmentNotesModule(
  getToken: GetToken,
  getUrl: GetBaseUrl
) {
  return new SupportDocumentAdjustmentNotesModule(getToken, getUrl);
}