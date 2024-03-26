import db from './db';
import { IMedia } from './dbTypes';


export const insertMedia = async (media: IMedia) => {
    try {
        const { user_id, title, type, status, rating, comments, author } = media;
        const query = `
            INSERT INTO media (user_id, title, type, status, rating, comments, author)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [user_id, title, type, status, rating || null, comments || null, author || null]);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const updateMedia = async (mediaId: number, updates: { title?: string; type?: string; status?: string; rating?: number; comments?: string }) => {
    const queryParts: string[] = []; // Explicitly typing as an array of strings
    const queryParams: (string | number)[] = []; // This can hold both strings and numbers

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
        UPDATE media
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(mediaId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteMedia = async (mediaId: number) => {
    const query = `
        DELETE FROM media
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [mediaId]);
    return result;
};

export const linkMediaAndTag = async (mediaId: number, tagId: number) => {
    const query = `
        INSERT INTO media_tags (media_id, tag_id)
        VALUES (?, ?)
    `;
    const [result] = await db.execute(query, [mediaId, tagId]);
    return result;
};

export const unlinkMediaAndTag = async (mediaId: number, tagId: number) => {
    const query = `
        DELETE FROM media_tags
        WHERE media_id = ? AND tag_id = ?
    `;
    const [result] = await db.execute(query, [mediaId, tagId]);
    return result;
};