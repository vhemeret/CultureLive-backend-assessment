import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
