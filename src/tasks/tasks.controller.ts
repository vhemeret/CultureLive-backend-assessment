import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/all')
  async listAllTasks() {
    return this.tasksService.listAllTasks();
  }

  @Get('/run')
  async runTask() {
    return this.tasksService.runTask();
  }
}
