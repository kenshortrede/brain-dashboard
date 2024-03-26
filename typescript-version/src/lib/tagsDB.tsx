import db from './db';

export const insertTag = async (tag: string) => {
    console.log('Inserting tag:', tag);
    if (!tag) {
        throw new Error('Tag cannot be empty');
    }
    try {
        // Check if the tag already exists to avoid duplicates
        const checkQuery = `SELECT id FROM tags WHERE tag = ?`;
        const [existing] = await db.execute(checkQuery, [tag]);
        console.log("Existing: ", existing);
        if (existing.length > 0) {
            // Return existing tag ID if it already exists
            return existing[0];
        }
        console.log("Got here");
        // Insert new tag if it doesn't exist
        const insertQuery = `INSERT INTO tags (tag) VALUES (?)`;
        const [insertResult] = await db.execute(insertQuery, [tag]);
        const newTagId = insertResult.insertId; // Assuming insertId is available in the result
        console.log("Got here...", newTagId);
        return { id: newTagId }; // Return the new tag ID in a similar format for consistency
    } catch (error) {
        console.error('Failed to insert tag:', error);
    }
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
