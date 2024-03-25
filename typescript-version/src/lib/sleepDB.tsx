import db from './db';

export const insertSleep = async (userId: number | null, dailyLogsId: number | null, durationHours: number, quality: string, notes: string) => {
    try {
        const query = `
        INSERT INTO sleep (user_id, duration_hours, quality, notes, daily_logs_id)
        VALUES (?, ?, ?, ?, ?)
    `;
        const [result] = await db.execute(query, [userId, durationHours, quality, notes, dailyLogsId]);
        return result;
    } catch (error) {
        console.error('Failed to insert sleep:', error);
        return null;
    }
};

export const updateSleep = async (sleepId: number, updates: { durationHours?: number; quality?: string; notes?: string; dailyLogsId?: number | null }) => {
    const queryParts: string[] = [];
    const queryParams: (string | number | null)[] = [];

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
        UPDATE sleep
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(sleepId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteSleep = async (sleepId: number) => {
    const query = `
        DELETE FROM sleep
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [sleepId]);
    return result;
};
