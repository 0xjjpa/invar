import { Credential, SignatureAlgorithm } from '@nodecfdi/credentials'
import { KEYUTIL, RSAKey, hex2b64, KJUR } from 'jsrsasign';
import { importRSAPrivateKeyFromPEMFormat } from './rsa';


// Downloaded from http://omawww.sat.gob.mx/tramitesyservicios/Paginas/certificado_sello_digital.htm
export const loadDemoCredential = async (): Promise<Credential> => {
  const blobPrivateKey = await (await fetch(`/keys/demo.key`)).arrayBuffer();
  const blobCertificate = await (await fetch(`/keys/demo.cer`)).arrayBuffer();
  const privateKey = Buffer.from(blobPrivateKey).toString("binary");
  const certificate = Buffer.from(blobCertificate).toString("binary");
  const fiel = Credential.create(String(certificate), String(privateKey), "12345678a");
  return fiel;
};

export const loadCryptoKeyFromCredential = async ({ credential }: { credential: Credential }): Promise<CryptoKey> => {
  const rsaKey: RSAKey = KEYUTIL.getKeyFromEncryptedPKCS8PEM(credential.privateKey().pem(), credential.privateKey().passPhrase())
  const decryptedPEM = KEYUTIL.getPEM(rsaKey, "PKCS8PRV");
  const cryptoKey = await importRSAPrivateKeyFromPEMFormat(decryptedPEM);
  return cryptoKey;
}

export function generateSignature(credential: Credential, payload: string): string {
  const signatureAsHex = credential.sign(payload);
  return signatureAsHex
}

export function verifySignature(credential: Credential, payload: string, signatureAsB64: string): boolean {
  const sig = new KJUR.crypto.Signature({ alg: SignatureAlgorithm.SHA256 });
  const certificate = credential.certificate();
  const certificateAsPEM = certificate.pem();
  sig.init(certificateAsPEM);
  sig.updateString(payload);
  const isValid = sig.verify(signatureAsB64);
  return isValid;
}
