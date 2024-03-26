import db from './db';
import { INote, INoteEntry } from './dbTypes';

export const insertNote = async (note: INoteEntry) => {
    try {
        const query = `
        INSERT INTO notes (user_id, category, title, content)
        VALUES (?, ?, ?, ?)
    `;
        const [result] = await db.execute(query, [note.note.user_id, note.note.category, note.note.title, note.note.content]);
        return result;
    } catch (error) {
        console.error(error);
    }
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
    try {
        const query = `
        INSERT INTO note_tags (note_id, tag_id)
        VALUES (?, ?)
    `;
        console.log("noteId: ", noteId, "tagId: ", tagId);
        const [result] = await db.execute(query, [noteId, tagId]);
        console.log("Result: ", result);
        return result;
    } catch (error) {
        console.error("[linkNoteAndTag]", error);
    }
};

export const unlinkNoteAndTag = async (noteId: number, tagId: number) => {
    const query = `
        DELETE FROM note_tags
        WHERE note_id = ? AND tag_id = ?
    `;
    const [result] = await db.execute(query, [noteId, tagId]);
    return result;
};

// Select all notes
export const getAllNotes = async () => {
    const query = `
        SELECT * FROM notes
    `;
    const [rows] = await db.execute(query);
    return rows;
};

// Select note by ID
export const getNoteById = async (noteId: number) => {
    const query = `
        SELECT * FROM notes
        WHERE id = ?
    `;
    const [rows] = await db.execute(query, [noteId]);
    return rows;
};