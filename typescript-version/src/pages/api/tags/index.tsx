// pages/api/tags.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTags } from '../../../lib/tagsDB'; // Adjust the import path based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const tags = await getAllTags();
            res.status(200).json(tags);
        } catch (error) {
            console.error('Failed to fetch tags:', error);
            res.status(500).json({ message: 'Failed to fetch tags' });
        }
    } else {
        // Handle any methods other than GET
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
