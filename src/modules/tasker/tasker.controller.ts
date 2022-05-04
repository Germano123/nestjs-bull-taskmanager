import { Body, Controller, Post } from "@nestjs/common";
import { TaskDto } from "./dto/TaskDto";
import { TaskerService } from "./tasker.service";

@Controller("tasks")
export class TaskerController {
    constructor(private readonly service: TaskerService) {}

    @Post("create-task")
    async createTask(@Body() task: TaskDto): Promise<any> {
        return await this.service.addTask(task);
    }
}