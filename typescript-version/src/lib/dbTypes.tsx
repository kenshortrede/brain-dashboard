export interface IDailyLogEntry {
    dailyLog: IDailyLog;
    workout: IWorkoutComponent; //IWorkout;
    sleep: ISleep;
    meditations: IMeditation[];
}

export interface IDailyLog {
    id: number | null;
    user_id: number;
    content: any;
    mood: number | null;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface IMedia {
    id: number | null;
    user_id: number;
    title: string;
    type: 'Book' | 'Movie' | 'Video' | 'Podcast';
    status: 'Planned' | 'In Progress' | 'Completed';
    author: string | null;
    rating: number | null;
    comments: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface IMediaTag {
    media_id: number;
    tag_id: number;
}

export interface IMeditation {
    id: number | null;
    user_id: number | null;
    title: string;
    type: string;
    duration_minutes: number | null;
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    daily_logs_id: number | null;
}

export interface INoteSubmission {
    note: INoteEntry;
    newTags: string[] | null;
}

export interface INoteEntry {
    note: INote;
    tags: number[];
}
export interface INote {
    id: number | null;
    user_id: number;
    category: 'Personal' | 'Work' | 'Education' | 'Other';
    title: string | null;
    content: string | null;
    created_at: Date | null;
    updated_at: Date | null;
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
    id: number | null;
    user_id: number | null;
    duration_hours: number;
    quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
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
export interface IWorkoutComponent {
    workout: IWorkout;
    types: number[];
}
export interface IWorkout {
    id: number | null;
    user_id: number;
    duration_minutes: number | null;
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
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
