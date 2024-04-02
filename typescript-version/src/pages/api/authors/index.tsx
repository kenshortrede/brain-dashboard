import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthors } from '../../../lib/quotesDB'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Assuming you're storing the userId in the session or somewhere else
            // For demonstration, let's use a static userId, replace it with actual userId retrieval logic
            const userId = 1;
            const authors = await getAuthors(userId);
            res.status(200).json(authors);
        } catch (error) {
            console.error('Failed to fetch authors:', error);
            res.status(500).json({ error: 'Failed to fetch authors' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}