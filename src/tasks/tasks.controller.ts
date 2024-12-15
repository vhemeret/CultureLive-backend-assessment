import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/all')
  listAllTasks() {
    return this.tasksService.listAllTasks();
  }

  @Get('/run')
  runTask() {
    return this.tasksService.runTask();
  }
}
