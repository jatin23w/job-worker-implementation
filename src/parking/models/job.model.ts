export enum JobPriority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
}

export enum JobStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export interface Job {
    id: string;
    name: string;
    payload: Record<string, unknown>;
    priority: JobPriority;
    status: JobStatus;
    createdAt: Date;
    error?: string;
}