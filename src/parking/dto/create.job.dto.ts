import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { JobPriority } from "../models/job.model";

export class CreateJobDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsObject()
    @IsOptional()
    payload?: Record<string, unknown>;

    @IsEnum(JobPriority)
    priority! :JobPriority;
}