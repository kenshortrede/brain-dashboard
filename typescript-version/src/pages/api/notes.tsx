import type { NextApiRequest, NextApiResponse } from 'next';
// Import the necessary interfaces from dbTypes.tsx
import { IDailyLog, IWorkout, ISleep, IMeditation, IDailyLogEntry, IMedia, INoteEntry, INoteSubmission } from '../../lib/dbTypes';
import { insertDailyLog } from '../../lib/dailyLogsDB';
import { insertWorkout, insertWorkoutAndLinkTypes, linkWorkoutAndType } from '../../lib/workoutsDB';
import { insertSleep } from '../../lib/sleepDB';
import { insertMeditation } from '../../lib/meditationsDB';
// Import other necessary DB interaction functions
import pool from '../../lib/db';
import { insertMedia } from 'src/lib/mediaDB';
import { insertNote, linkNoteAndTag } from 'src/lib/notesDB';
import { insertTag } from 'src/lib/tagsDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { note, newTags }: INoteSubmission = req.body;
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        try {

            const existingTags = note.tags;

            // Insert the note
            const noteResult = await insertNote(note);
            const noteId = noteResult.insertId;

            // Insert new tags and get their IDs
            const newTagIds = await Promise.all(newTags.map(async (tagName) => {
                console.log('Inserting tag:', tagName);
                const tagResult = await insertTag(tagName); // Assume insertTag handles duplicate tags
                return tagResult.id;
            }));
            console.log('New tag IDs:', newTagIds);
            // Combine existing tag IDs and new tag IDs
            const allTagIds = [...existingTags, ...newTagIds];

            // Link the note with all tags
            await Promise.all(allTagIds.map(async (tagId) => {
                await linkNoteAndTag(noteId, tagId);
            }));

            await connection.commit();
            connection.release();
            res.status(200).json({ message: 'Note added successfully' });
        } catch (error) {
            if (connection) {
                await connection.rollback();
                connection.release();
            }
            console.error('Failed to add note:', error);
            res.status(500).json({ error: 'Failed to add note' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}