import { create } from "zustand";

export interface PDFState {
  documentURL: string;
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => void;
}

export const usePDFStore = create<PDFState>()((set) => ({
  documentURL: null,
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => {
    set(() => ({
      documentURL,
    }));
  },
}));
