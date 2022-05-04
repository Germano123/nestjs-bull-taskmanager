import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { TaskDto } from "./dto/TaskDto";

@Processor("task-queue")
export class TaskConsumerService {
    constructor() {}

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }

    //@OnQueueStalled
    //@OnQueueCompleted
    //@OnQueueFailed
    //@OnQueueResumed
    //@OnQueueDrained
    //@OnQueueRemoved

    @Process("task-job")
    async createNewTask(job: Job<TaskDto>): Promise<any> {
        console.log(`${job.data.name} was finished!`);
        return null;
    }

    // queue.pause();
    // queue.resume();
}