import { Credential, SignatureAlgorithm } from '@nodecfdi/credentials'
import { KEYUTIL, RSAKey, hex2b64 } from 'jsrsasign';
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

export const loadCryptoKeyFromCredential = async({ credential }: { credential: Credential }): Promise<CryptoKey> => {
  const rsaKey: RSAKey = KEYUTIL.getKeyFromEncryptedPKCS8PEM(credential.privateKey().pem(), credential.privateKey().passPhrase())
  const decryptedPEM = KEYUTIL.getPEM(rsaKey, "PKCS8PRV");
  const cryptoKey = await importRSAPrivateKeyFromPEMFormat(decryptedPEM);
  return cryptoKey;
}

export function generateSignature(credential: Credential, payload: string): string {
  const signatureAsHex = credential.sign(payload, SignatureAlgorithm.SHA1);
  const signatureAsB64 = hex2b64(signatureAsHex)
  return signatureAsB64
}
  