import { Injectable, Logger } from "@nestjs/common";
import { Job } from "./models/job.model";


@Injectable()
export class JobWorker {

    private readonly logger = new Logger(JobWorker.name);

    async process(job:Job): Promise<void>{
        this.logger.log(`sarting job : ${job.id}: ${job.name}`)

        //simulated worker process
        await new Promise<void>((resolve)=>{
            setTimeout(resolve, 500);
        })
        this.logger.log(`Success: ${job.id}`)
    }
}