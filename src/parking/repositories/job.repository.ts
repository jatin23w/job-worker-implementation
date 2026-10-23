import {Job} from '../models/job.model';

export interface JobRepository {
    save(job: Job): Promise<void>;
    findbyId(id: string): Promise<Job | null>;
    findAll():Promise<Job[]>;
    update(job:Job): Promise<void>;
}