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

export const getAuthors = async () => {
    const query = `
        SELECT id, tag from tags
        WHERE category = 'Authors & Influential Figures'
    `;
    const [authors] = await db.execute(query);
    console.log(authors);
    return authors;
}

// Get all quotes for user
export const getQuotes = async (userId: number) => {
    const query = `
        SELECT 
        quotes.id, 
        content, 
        author, 
        created_at, 
        updated_at, 
        GROUP_CONCAT(tags.tag SEPARATOR ', ') AS tags
    FROM quotes
    LEFT JOIN quote_tags ON quotes.id = quote_tags.quote_id
    LEFT JOIN tags ON quote_tags.tag_id = tags.id
    WHERE user_id = ?
    GROUP BY quotes.id, content, author, created_at, updated_at
    `;
    const [quotes] = await db.execute(query, [userId]);
    console.log(quotes.length);
    return quotes;
};