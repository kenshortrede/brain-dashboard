import db from './db';

export const insertNote = async (userId: number, category: string, title: string, content: string) => {
    const query = `
        INSERT INTO notes (user_id, category, title, content)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [userId, category, title, content]);
    return result;
};

export const updateNote = async (noteId: number, updates: { category?: string; title?: string; content?: string }) => {
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
        UPDATE notes
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(noteId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteNote = async (noteId: number) => {
    const query = `
        DELETE FROM notes
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [noteId]);
    return result;
};

export const linkNoteAndTag = async (noteId: number, tagId: number) => {
    const query = `
        INSERT INTO note_tags (note_id, tag_id)
        VALUES (?, ?)
    `;
    const [result] = await db.execute(query, [noteId, tagId]);
    return result;
};

export const unlinkNoteAndTag = async (noteId: number, tagId: number) => {
    const query = `
        DELETE FROM note_tags
        WHERE note_id = ? AND tag_id = ?
    `;
    const [result] = await db.execute(query, [noteId, tagId]);
    return result;
};