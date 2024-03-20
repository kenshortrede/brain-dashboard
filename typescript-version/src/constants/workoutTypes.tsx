// Define the workout type
export interface WorkoutType {
    id: number;
    name: string;
}

// List of workout types
export const workoutTypes: WorkoutType[] = [
    { id: 1, name: 'Chest' },
    { id: 2, name: 'Biceps' },
    { id: 3, name: 'Triceps' },
    { id: 4, name: 'Forearms' },
    { id: 5, name: 'Abs' },
    { id: 6, name: 'Legs' },
    { id: 7, name: 'Back' },
    { id: 8, name: 'Swimming' },
    { id: 9, name: 'Basketball' },
    // Add other
    { id: 10, name: 'Other' },
    // Add more as needed
];

export default workoutTypes;