import db from './db';

export const insertQuote = async (userId: number, content: string, author: string) => {
    const query = `
        INSERT INTO quotes (user_id, content, author)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [userId, content, author]);
    return result;
};

export const updateQuote = async (quoteId: number, updates: { content?: string; author?: string }) => {
    const queryParts: string[] = [];
    const queryParams: (string | number)[] = [];

    Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParts.push(`${key} = ?`);
            queryParams.push(value);
        }
    });

    if (queryParts.length === 0) {
        throw new Error("No updates provided");
    }

    const query = `
        UPDATE quotes
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(quoteId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteQuote = async (quoteId: number) => {
    const query = `
        DELETE FROM quotes
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [quoteId]);
    return result;
};

export const linkQuoteAndTag = async (quoteId: number, tagId: number) => {
    const query = `
        INSERT INTO quote_tags (quote_id, tag_id)
        VALUES (?, ?)
    `;
    const [result] = await db.execute(query, [quoteId, tagId]);
    return result;
};

export const unlinkQuoteAndTag = async (quoteId: number, tagId: number) => {
    const query = `
        DELETE FROM quote_tags
        WHERE quote_id = ? AND tag_id = ?
    `;
    const [result] = await db.execute(query, [quoteId, tagId]);
    return result;
};