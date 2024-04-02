import { insertWorkout, linkWorkoutAndType } from '../../../lib/workoutsDB';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { userId, dailyLogsId, notes, types } = req.body;
            const workoutResult = await insertWorkout(userId, dailyLogsId, notes);
            const workoutId = workoutResult.insertId;

            // Link workout to its types
            await Promise.all(types.map(async (typeId) => {
                await linkWorkoutAndType(workoutId, typeId);
            }));

            res.status(201).json({ message: 'Workout created successfully', workoutId });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}