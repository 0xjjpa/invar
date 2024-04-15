import { create } from "zustand";

export interface PDFState {
  documentURL: string;
  documentChecksum: string;
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => void;
  loadDocumentChecksum: ({
    documentChecksum,
  }: {
    documentChecksum: string;
  }) => void;
}

export const usePDFStore = create<PDFState>()((set) => ({
  documentURL: null,
  documentChecksum: null,
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => {
    set(() => ({
      documentURL,
    }));
  },
  loadDocumentChecksum: ({
    documentChecksum,
  }: {
    documentChecksum: string;
  }) => {
    set(() => ({
      documentChecksum,
    }));
  },
}));
