import type { NextApiRequest, NextApiResponse } from 'next';
// Import the necessary interfaces from dbTypes.tsx
import { IDailyLog, IWorkout, ISleep, IMeditation, IDailyLogEntry } from '../../lib/dbTypes';
import { insertDailyLog } from '../../lib/dailyLogsDB';
import { insertWorkout, insertWorkoutAndLinkTypes, linkWorkoutAndType } from '../../lib/workoutsDB';
import { insertSleep } from '../../lib/sleepDB';
import { insertMeditation } from '../../lib/meditationsDB';
// Import other necessary DB interaction functions
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { dailyLog, workout, sleep, meditations }: IDailyLogEntry = req.body;
        console.log("workout: ", workout, "sleep: ", sleep, "meditations: ", meditations, "dailyLog: ", dailyLog);

        // Get a connection from the pool
        const connection = await pool.getConnection();

        try {
            // Start a transaction
            await connection.beginTransaction();
            const user_id = dailyLog.user_id;
            // Insert the daily log
            const dailyLogResult = await insertDailyLog(user_id, dailyLog.content, dailyLog.mood);
            const dailyLogId: number = dailyLogResult.insertId; // Assuming insertDailyLog returns an object with an insertId property
            console.log("Returned successfully from insertDailyLog");

            // Insert workout, sleep, and meditations entries using dailyLogId
            // Adjust these function calls based on your actual implementation

            // Insert workout
            if (workout) {
                // Assuming workout.notes is optional, provide an empty string if not present
                const actualWorkoutData = workout.workout;
                const notes = actualWorkoutData.notes || '';
                const workoutTypes = workout.types;
                console.log(actualWorkoutData.duration_minutes);
                await insertWorkoutAndLinkTypes(user_id, dailyLogId, notes, workoutTypes, actualWorkoutData.duration_minutes);
                console.log("Returned successfully from insertWorkoutAndLinkTypes");
            }



            // Insert sleep
            if (sleep) {
                await insertSleep(user_id, dailyLogId, sleep.duration_hours, sleep.quality, sleep.notes ? sleep.notes : '');
            }



            // Insert meditations
            if (meditations) {

                for (const meditation of meditations) {
                    // await insertMeditation(user_id, dailyLogId, meditation.title, meditation.type, meditation.duration_minutes, meditation.notes);
                    await insertMeditation(user_id, meditation.title, meditation.type, meditation.duration_minutes, meditation.notes, dailyLogId);
                    console.log("Successfully inserted meditation: ", meditation.type);
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
