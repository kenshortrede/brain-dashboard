// src/pages/api/types.ts

export interface WorkoutEntry {
    types: string[];
    notes: string;
  }
  
  export interface SleepEntry {
    durationHours: number;
    quality: string;
    notes: string;
  }
  
  export interface MeditationEntry {
    title: string;
    type: string;
    durationMinutes: number;
    notes: string;
  }
  
  export interface DailyLogEntry {
    mood: number;
    content: string;
    workout: WorkoutEntry;
    sleep: SleepEntry;
    meditations: MeditationEntry[];
  }