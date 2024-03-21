import type { NextApiRequest, NextApiResponse } from 'next';
// Import the necessary interfaces from dbTypes.tsx
import { IDailyLog, IWorkout, ISleep, IMeditation, IDailyLogEntry } from '../../lib/dbTypes';
import { insertDailyLog } from '../../lib/dailyLogsDB';
import { insertWorkout, linkWorkoutAndType } from '../../lib/workoutsDB';
import { insertSleep } from '../../lib/sleepDB';
import { insertMeditation } from '../../lib/meditationsDB';
// Import other necessary DB interaction functions
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { mood, content, workout, sleep, meditations }: IDailyLogEntry = req.body;

        // Get a connection from the pool
        const connection = await pool.getConnection();

        try {
            // Start a transaction
            await connection.beginTransaction();

            // Insert the daily log
            const dailyLogResult = await insertDailyLog(1, content, mood);
            const dailyLogId = dailyLogResult.id; // Assuming insertDailyLog returns an object with an insertId property

            // Insert workout, sleep, and meditations entries using dailyLogId
            // Adjust these function calls based on your actual implementation

            // Insert workout
            if (workout) {
                const workoutResult = await insertWorkout(1, dailyLogId, workout.notes ? workout.notes : '');
                const workoutId = workoutResult.id;
                // Link workout and its types
                for (const typeId of workout.types) {
                    await linkWorkoutAndType(workoutId, typeId);
                }
            }

            // Insert sleep
            if (sleep) {
                await insertSleep(1, dailyLogId, sleep.duration_hours, sleep.quality, sleep.notes ? sleep.notes : '');
            }

            // Insert meditations
            if (meditations) {
                for (const meditation of meditations) {
                    await insertMeditation(1, dailyLogId, meditation.title, meditation.type, meditation.duration_minutes, meditation.notes);
                }
            }

            // Commit the transactionF
            await connection.commit();
            connection.release(); // Release the connection back to the pool
            res.status(200).json({ message: 'Daily entries submitted successfully' });
        } catch (error) {
            // Rollback the transaction in case of error
            await connection.rollback();
            connection.release(); // Release the connection back to the pool
            res.status(500).json({ error: 'Failed to submit daily entries', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
