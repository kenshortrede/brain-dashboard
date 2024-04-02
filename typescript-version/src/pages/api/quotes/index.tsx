import type { NextApiRequest, NextApiResponse } from 'next';
import { insertQuote, linkQuoteAndTag, getQuotes } from '../../../lib/quotesDB'; // Adjust the path as necessary
import { IQuoteSubmission } from 'src/lib/dbTypes';
import { insertTag, insertTagWithCategory } from 'src/lib/tagsDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { quote, tags }: IQuoteSubmission = req.body;
            const result = await insertQuote(quote.user_id, quote.content, quote.author ? quote.author.tag : "Unknown");
            const quoteId = result.insertId;

            await Promise.all(tags.map(async (tagId) => {
                if (tagId) {
                    await linkQuoteAndTag(quoteId, tagId);
                }
            }));

            if (quote.author && quote.author.tag) {
                if (quote.author.id) {
                    await linkQuoteAndTag(quoteId, quote.author.id);
                } else {
                    const authorTag = await insertTagWithCategory(quote.author.tag, "Authors & Influential Figures");
                    await linkQuoteAndTag(quoteId, authorTag.id);
                }
            }

            res.status(201).json({ message: 'Quote added successfully', result });
        } catch (error) {
            console.error('Failed to add quote:', error);
            res.status(500).json({ error: 'Failed to add quote' });
        }
    } else if (req.method === 'GET') {
        // Handle GET request
        try {
            const userId = 1; // Assuming user_id is 1 for now
            const quotes = await getQuotes(userId); // Assuming getQuotes fetches all quotes
            res.status(200).json(quotes);
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
            res.status(500).json({ error: 'Failed to fetch quotes' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}