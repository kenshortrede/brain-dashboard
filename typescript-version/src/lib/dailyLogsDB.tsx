import db from './db';

export const insertDailyLog = async (userId: number, content: string | null, mood: number | null) => {
    const query = `
        INSERT INTO daily_logs (user_id, content, mood)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [userId, content, mood]);
    return result;
};

export const updateDailyLog = async (dailyLogId: number, updates: { content?: string; mood?: number }) => {
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
        UPDATE daily_logs
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(dailyLogId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteDailyLog = async (dailyLogId: number) => {
    const query = `
        DELETE FROM daily_logs
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [dailyLogId]);
    return result;
};

export const getDailyLogById = async (dailyLogId: number) => {
    const query = `
        SELECT * FROM daily_logs
        WHERE id = ?
    `;
    const [rows] = await db.execute(query, [dailyLogId]);
    return rows;
};