// /api/quotes/linkTags.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { linkQuoteAndTag } from '../../../lib/quotesDB'; // Adjust the import path based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { quoteId, tagIds } = req.body;
            // Assuming linkQuoteAndTag is a function that takes a quote ID and an array of tag IDs
            await Promise.all(tagIds.map(tagId => linkQuoteAndTag(quoteId, tagId)));
            res.status(200).json({ message: 'Tags linked successfully' });
        } catch (error) {
            console.error('Failed to link tags:', error);
            res.status(500).json({ message: 'Failed to link tags' });
        }
    } else {
        // Handle any methods other than POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}