import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId, dailyLogsId, type, notes } = req.body;
            const [result] = await db.execute(
                'INSERT INTO workouts (user_id, daily_logs_id, type, notes) VALUES (?, ?, ?, ?)',
                [userId, dailyLogsId, type, notes]
            );
            res.status(201).json({ message: 'Workout added', workoutId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: 'Error adding workout', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}