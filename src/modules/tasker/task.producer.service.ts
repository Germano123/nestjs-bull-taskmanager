import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { TaskDto } from "./dto/TaskDto";

@Injectable()
export class TaskProducerService {
    constructor(@InjectQueue('task-queue') private queue: Queue) {}

    async addTask(task: TaskDto, delay: number = 1000): Promise<any> {
        await this.queue.add("task-job", task, { delay });
        console.log("Task add");
    }
}