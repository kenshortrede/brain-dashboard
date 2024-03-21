export interface IDailyLogEntry {
    mood: number;
    content: string;
    workout: IWorkout;
    sleep: ISleep;
    meditations: IMeditation[];
}

export interface IDailyLog {
    id: number;
    user_id: number;
    content: JSON | null;
    mood: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface IMedia {
    id: number;
    user_id: number;
    title: string;
    type: 'Book' | 'Movie' | 'Video' | 'Podcast';
    status: 'Planned' | 'In Progress' | 'Completed';
    rating: number | null;
    comments: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface IMediaTag {
    media_id: number;
    tag_id: number;
}

export interface IMeditation {
    id: number;
    user_id: number;
    title: string;
    type: 'Goal Visualization' | 'Confidence' | 'Love' | 'Letting Go' | 'Breathing' | 'Grounding';
    duration_minutes: number | null;
    notes: string | null;
    created_at: Date;
    updated_at: Date;
    daily_logs_id: number | null;
}

export interface INote {
    id: number;
    user_id: number;
    category: 'Personal' | 'Work' | 'Education' | 'Other';
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface INoteTag {
    note_id: number;
    tag_id: number;
}

export interface IQuote {
    id: number;
    user_id: number;
    content: string;
    author: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface IQuoteTag {
    quote_id: number;
    tag_id: number;
}

export interface ISleep {
    id: number;
    user_id: number;
    duration_hours: number;
    quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    notes: string | null;
    created_at: Date;
    updated_at: Date;
    daily_logs_id: number | null;
}

export interface ITag {
    id: number;
    tag: string;
}

export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface IWorkout {
    id: number;
    user_id: number;
    notes: string | null;
    created_at: Date;
    updated_at: Date;
    daily_logs_id: number | null;
}

export interface IWorkoutType {
    id: number;
    type_name: string;
}

export interface IWorkoutWorkoutType {
    workout_id: number;
    workout_type_id: number;
}
