
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';


import { JOB_REPOSITORY } from './constants';
import { JobRepository } from './repositories/job.repository';
import { Job, JobPriority, JobStatus } from './models/job.model';
import { JobWorker } from './job.worker';
import { CreateJobDTO } from './dto/create.job.dto';

@Injectable()
export class JobService {
  constructor(
    @Inject(JOB_REPOSITORY)
    private readonly repository: JobRepository,
    private readonly worker: JobWorker,
  ) {}

  async create(dto: CreateJobDTO): Promise<Job> {
    const job: Job = {
      id: randomUUID(),
      name: dto.name,
      payload: dto.payload ?? {},
      priority: dto.priority,
      status: JobStatus.PENDING,
      createdAt: new Date(),
    }

    await this.repository.save(job);

    if(job.priority === JobPriority.MEDIUM){
      return job;
    }

    job.status = JobStatus.PROCESSING;
    await this.repository.update(job);

    //worker implementation

    try {
      await this.worker.process(job);
      job.status = JobStatus.COMPLETED;
    } catch (e){
      job.status = JobStatus.FAILED;
      job.error = e instanceof Error ? e.message : 'Job process failed';
    } 

    await this.repository.update(job);

      return job;


    // async findById(id: string): Promise<Job>{

    // }
  }
}