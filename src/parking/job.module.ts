
import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JOB_REPOSITORY } from './constants';

@Module({
  controllers: [JobController],
  providers: [
    JobService,
    {
      provide: JOB_REPOSITORY,
      useExisting: JOB_REPOSITORY,
    },
  ],
})
export class ParkingModule {}
