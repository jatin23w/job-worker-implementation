


import { Injectable } from '@nestjs/common';
import {Job} from '../models/job.model'
import { JobRepository } from './job.repository';

@Injectable()
export class InMemoryJobRepo implements JobRepository {
    private readonly jobs = new Map<string, Job>();

    async save(job: Job): Promise<void>{
        this.jobs.set(job.id, {...job})
 }
    async findbyId(id: string): Promise<Job | null>{
        const job = this.jobs.get(id);

        return job ? {...job} : null;
    }
    async findAll():Promise<Job[]>{
        return Array.from(this.jobs.values()).map((job)=>({
            ...job,
        }))
    }
    async update(job:Job): Promise<void>{
        if(!this.jobs.has(job.id)){
            throw new Error(`No job found with ID: ${job.id}`)
        }
        this.jobs.set(job.id, {...job});
    }


}