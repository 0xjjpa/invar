import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query;

    try {
        // Adjust the path according to where your files are stored
        const filePath = path.resolve('./public/documents', Array.isArray(filename) ? filename[0] : filename);
        
        // Read the file content
        const fileBuffer = await fs.readFile(filePath);

        // Create a SHA-256 hash from the file content
        const hash = createHash('sha256');
        hash.update(fileBuffer);

        // Send the hash in hexadecimal format
        res.status(200).json({ hash: hash.digest('hex') });
    } catch (error) {
        res.status(500).json({ error: 'Failed to hash the file' });
    }
}
