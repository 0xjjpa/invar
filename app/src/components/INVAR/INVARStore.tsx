import { create } from "zustand";
import { Credential } from "@nodecfdi/credentials";

export interface PDFState {
  documentURL: string;
  documentChecksum: string;
  credential: Credential;
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => void;
  loadDocumentChecksum: ({
    documentChecksum,
  }: {
    documentChecksum: string;
  }) => void;
  loadCredential: ({ credential }: { credential: Credential }) => void;
}

export const usePDFStore = create<PDFState>()((set) => ({
  documentURL: null,
  documentChecksum: null,
  credential: null,
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => {
    set(() => ({ documentURL }));
  },
  loadDocumentChecksum: ({
    documentChecksum,
  }: {
    documentChecksum: string;
  }) => {
    set(() => ({ documentChecksum }));
  },
  loadCredential: ({ credential }: { credential: Credential }) => {
    set(() => ({ credential }));
  },
}));
