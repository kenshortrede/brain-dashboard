import db from './db';

export const insertWorkout = async (userId: number, dailyLogsId: number, notes: string) => {
    const query = `
    INSERT INTO workouts (user_id, daily_logs_id, notes)
    VALUES (?, ?, ?)
  `;
    const [result] = await db.execute(query, [userId, dailyLogsId, notes]);
    return result;
};

export const updateWorkout = async (workoutId: number, notes: string) => {
    const query = `
    UPDATE workouts
    SET notes = ?
    WHERE id = ?
  `;
    const [result] = await db.execute(query, [notes, workoutId]);
    return result;
};

export const deleteWorkout = async (workoutId: number) => {
    const query = `
    DELETE FROM workouts
    WHERE id = ?
  `;
    const [result] = await db.execute(query, [workoutId]);
    return result;
};

export const insertWorkoutType = async (typeName: string) => {
    const query = `
      INSERT INTO workout_types (type_name)
      VALUES (?)
    `;
    const [result] = await db.execute(query, [typeName]);
    return result;
};

export const linkWorkoutAndType = async (workoutId: number, workoutTypeId: number) => {
    const query = `
      INSERT INTO workout_workout_types (workout_id, workout_type_id)
      VALUES (?, ?)
    `;
    const [result] = await db.execute(query, [workoutId, workoutTypeId]);
    return result;
};

export const unlinkWorkoutAndType = async (workoutId: number, workoutTypeId: number) => {
    const query = `
      DELETE FROM workout_workout_types
      WHERE workout_id = ? AND workout_type_id = ?
    `;
    const [result] = await db.execute(query, [workoutId, workoutTypeId]);
    return result;
};

// Optional: If you need to update workout types, though typically you might not need to.
export const updateWorkoutType = async (workoutTypeId: number, newTypeName: string) => {
    const query = `
      UPDATE workout_types
      SET type_name = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [newTypeName, workoutTypeId]);
    return result;
};
