import { create } from "zustand";
import { Credential } from "@nodecfdi/credentials";
import { AttestationResult } from "@ethsign/sp-sdk";

export interface PDFState {
  documentURL: string;
  documentChecksum: string;
  credential: Credential;
  key: CryptoKey;
  signature: string;
  attestation: AttestationResult;
  loadDocumentURL: ({ documentURL }: { documentURL: string }) => void;
  loadDocumentChecksum: ({
    documentChecksum,
  }: {
    documentChecksum: string;
  }) => void;
  loadCredential: ({ credential }: { credential: Credential }) => void;
  loadKey: ({ key }: { key: CryptoKey }) => void;
  loadSignature: ({ signature }: { signature: string }) => void;
  loadAttestation: ({
    attestation,
  }: {
    attestation: AttestationResult;
  }) => void;
}

export const usePDFStore = create<PDFState>()((set) => ({
  documentURL: null,
  documentChecksum: null,
  credential: null,
  key: null,
  signature: null,
  attestation: null,
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
  loadKey: ({ key }: { key: CryptoKey }) => {
    set(() => ({ key }));
  },
  loadSignature: ({ signature }: { signature: string }) => {
    set(() => ({ signature }));
  },
  loadAttestation: ({ attestation }: { attestation: AttestationResult }) => {
    set(() => ({ attestation }));
  },
}));
