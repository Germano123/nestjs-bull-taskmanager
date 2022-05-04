import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { TaskConsumerService } from "./task.consumer.service";
import { TaskProducerService } from "./task.producer.service";
import { TaskerController } from "./tasker.controller";
import { TaskerService } from "./tasker.service";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'task-queue',
        }),
        SharedModule,
    ],
    controllers: [TaskerController],
    exports: [TaskerService],
    providers: [TaskerService, TaskConsumerService, TaskProducerService]
})
export class TaskerModule {}