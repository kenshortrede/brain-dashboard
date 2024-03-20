import db from './db';

export const insertTag = async (tag: string) => {
    // Check if the tag already exists to avoid duplicates
    const checkQuery = `
        SELECT id FROM tags WHERE tag = ?
    `;
    const existing = await db.execute(checkQuery, [tag]);
    if (existing.length > 0) {
        // Return existing tag ID if it already exists
        return existing[0];
    }

    // Insert new tag if it doesn't exist
    const insertQuery = `
        INSERT INTO tags (tag)
        VALUES (?)
    `;
    const [result] = await db.execute(insertQuery, [tag]);
    return result;
};

export const getTagById = async (id: number) => {
    const query = `
        SELECT * FROM tags WHERE id = ?
    `;
    const [result] = await db.execute(query, [id]);
    return result;
};

export const getAllTags = async () => {
    const query = `
        SELECT * FROM tags
    `;
    const [result] = await db.execute(query);
    return result;
};

export const deleteTag = async (id: number) => {
    const query = `
        DELETE FROM tags WHERE id = ?
    `;
    const [result] = await db.execute(query, [id]);
    return result;
};
