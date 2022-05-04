import { Injectable } from "@nestjs/common";
import { TaskDto } from "./dto/TaskDto";
import { TaskProducerService } from "./task.producer.service";

@Injectable()
export class TaskerService {
    constructor(private readonly producerService: TaskProducerService) {}

    async addTask(task: TaskDto): Promise<any> {
        await this.producerService.addTask(task);
        return "Add task succesfully";
    }
}