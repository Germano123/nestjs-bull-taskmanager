import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigService } from './modules/shared/services/config.service';
import { TaskerModule } from './modules/tasker/tasker.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    TaskerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
