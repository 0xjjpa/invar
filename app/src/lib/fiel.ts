import { Credential } from '@nodecfdi/credentials'

// Downloaded from http://omawww.sat.gob.mx/tramitesyservicios/Paginas/certificado_sello_digital.htm
export const loadDemoCredential = async (): Promise<Credential> => {
  const blobPrivateKey = await (await fetch(`/keys/demo.key`)).arrayBuffer();
  const blobCertificate = await (await fetch(`/keys/demo.cer`)).arrayBuffer();
  const privateKey = Buffer.from(blobPrivateKey).toString("binary");
  const certificate = Buffer.from(blobCertificate).toString("binary");
  const fiel = Credential.create(String(certificate), String(privateKey), "12345678a");
  return fiel;
};