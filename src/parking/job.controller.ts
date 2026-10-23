
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  
  import { JobService } from './job.service';
import { CreateJobDTO } from './dto/create.job.dto';
  
  @Controller('job')
  export class JobController {
    constructor(private readonly jobService: JobService) {}
  
    @Post()
    create(@Body() dto: CreateJobDTO){
      return this.jobService.create(dto);
    }
    
  }
  