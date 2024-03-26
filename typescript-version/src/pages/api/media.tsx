import type { NextApiRequest, NextApiResponse } from 'next';
// Import the necessary interfaces from dbTypes.tsx
import { IDailyLog, IWorkout, ISleep, IMeditation, IDailyLogEntry, IMedia } from '../../lib/dbTypes';
import { insertDailyLog } from '../../lib/dailyLogsDB';
import { insertWorkout, insertWorkoutAndLinkTypes, linkWorkoutAndType } from '../../lib/workoutsDB';
import { insertSleep } from '../../lib/sleepDB';
import { insertMeditation } from '../../lib/meditationsDB';
// Import other necessary DB interaction functions
import pool from '../../lib/db';
import { insertMedia } from 'src/lib/mediaDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const mediaData: IMedia = req.body; // Assuming the body directly contains the media data

        try {
            const result = await insertMedia(mediaData);
            res.status(200).json({ message: 'Media inserted successfully', result });
        } catch (error: any) {
            res.status(500).json({ error: 'Failed to insert media', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}