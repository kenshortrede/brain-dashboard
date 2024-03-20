import db from './db';

export const insertMeditation = async (userId: number, title: string, type: string, durationMinutes: number | null, notes: string | null, dailyLogsId: number | null) => {
    const query = `
        INSERT INTO meditations (user_id, title, type, duration_minutes, notes, daily_logs_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [userId, title, type, durationMinutes, notes, dailyLogsId]);
    return result;
};

export const updateMeditation = async (meditationId: number, updates: { title?: string; type?: string; durationMinutes?: number; notes?: string; dailyLogsId?: number | null }) => {
    const queryParts: string[] = [];
    const queryParams = [];

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
        UPDATE meditations
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(meditationId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteMeditation = async (meditationId: number) => {
    const query = `
        DELETE FROM meditations
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [meditationId]);
    return result;
};
