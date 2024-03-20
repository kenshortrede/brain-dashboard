import db from './db';

export const insertUser = async (username: string, password: string, email: string) => {
    const query = `
        INSERT INTO users (username, password, email)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [username, password, email]);
    return result;
};

export const updateUser = async (userId: number, updates: { username?: string; password?: string; email?: string }) => {
    const queryParts = [];
    const queryParams = [];

    // Dynamically build the query based on provided updates
    if (updates.username) {
        queryParts.push('username = ?');
        queryParams.push(updates.username);
    }
    if (updates.password) {
        queryParts.push('password = ?');
        queryParams.push(updates.password);
    }
    if (updates.email) {
        queryParts.push('email = ?');
        queryParams.push(updates.email);
    }

    if (queryParts.length === 0) {
        throw new Error("No updates provided");
    }

    const query = `
        UPDATE users
        SET ${queryParts.join(', ')}
        WHERE id = ?
    `;
    queryParams.push(userId);

    const [result] = await db.execute(query, queryParams);
    return result;
};

export const deleteUser = async (userId: number) => {
    const query = `
        DELETE FROM users
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [userId]);
    return result;
};
