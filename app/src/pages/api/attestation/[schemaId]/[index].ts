import { NextApiRequest, NextApiResponse } from 'next';
import { createAttestation } from '../../../../lib/sign';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { schemaId, index } = req.query;
  const { attestationData } = req.body;

  try {
    const attestation = await createAttestation({
      schemaId: `${schemaId}`,
      attestationData,
      index: `${index}`,
    });
    res.status(200).json({ attestation: JSON.stringify(attestation) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to hash the file' });
  }
}
