# INVAR

<img width="703" alt="image" src="https://github.com/0xjjpa/invar/assets/1128312/bc0434af-43b3-4cac-a53e-21c28cb21f7e">

_Back of napkin design, document tied to an immutable ledger able to provide a timestamp while storing metadata for verification. (1) Showcases the RSA signature of a document's SHA256 checksum, and (3) the storage of the RSA's public key and equivalent SHA256 checksum to be stored in a immutable ledger. (2) Points to the visual version of the document encrypted through a separate AES-256 key (2nd stage)_

A decentralized system for secure, tamper-proof verification of signed documents, ensuring `(I)`ntegrity, `(N)`on-`(R)`epudation, `(V)`alidity and `(A)`uthenticity through digital signatures, [Sign Protocol](https://sign.global), and blockchain.

- 👤 Who? Professionals in any field who need to issue secure, official or legally binding documents.
- ❌ Why? Document forgery, jeopardizing the reliability and trust in critical documents.
- ⚙️ How? By issuing PKI-enabled, traceable and permanent attestations through decentralized tech.

# Description

INVAR is a decentralized document verification system that revolutionizes the way we verify the authenticity, integrity, and non-repudiation of signed documents. By leveraging blockchain technology and digital signatures, INVAR provides a secure and tamper-proof environment for document verification, which has been traditionally been done through centralised solutions (e.g., DocuSign).

The process begins with the document issuer creating and signing a digital document using a private key. To facilitate the verification process, the issuer delegates the submission of the document metadata to INVAR. INVAR submits the metadata, including the document hash, and issuer's public key, along with the issuer's signature and delegation proof as part of INVAR's context store.

To achieve this, INVAR integrates with Sign Protocol, a powerful attestation framework, to create attestations for the document metadata which is then used as part of its own context store. These attestations are stored on-chain, ensuring their immutability and accessibility while still preserving the privacy of these documents.

When a third party (e.g., governmental, private sector) needs to verify a document, they can easily access INVAR and retrieve the associated attestation using the document ID. INVAR provides a user-friendly interface that guides the third party through the verification process. They can verify the issuer's signature on the document hash and confirm the delegation proof, establishing the authenticity and integrity of the document. A document issued through INVAR will. have all the required metadata for its proper verification.

One of the key features of INVAR is its support for delegation. Document issuers can delegate the submission of metadata to INVAR, reducing their burden and streamlining the process. INVAR ensures privacy and confidentiality by encrypting documents and storing them off-chain, with only the metadata and storage references recorded on the blockchain.

# How it's Made
INVAR relies on a RSA key that has been used to generate a CSR stamped by a CA root authority able to issue a CER that has enough metadata to connect a digital signature to an individual or company. For the purposes of the demo, [Mexico's Tax Revenue Service (SAT) PKI is used](http://omawww.sat.gob.mx/tramitesyservicios/Paginas/certificado_sello_digital.htm). Any other digital PKI that can encrypt and sign (e.g. Estonian's e-ID EC-384 signatures) could work.

INVAR stores the RSA signature of the SHA-256 hash of the document, to also disclose it upon request for whoever needs to verify it. INVAR submits to Arweave via Sign Protocol the metadata of the document, including the public key of the RSA issuer's private key, and the SHA-256 hash of the document.

INVAR structures its data system via Sign Protocol attestations and has an open schema for anyone to aggregate and build on top of. INVAR allows the verification of the documents cryptographically by ECDSA-verifying the signature of the issuer against the SHA-256 hash of the generated PDF file.
