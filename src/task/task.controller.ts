import { RequestWithUser } from './../commom/dto/request-with-user.dto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ZodPipe } from './../commom/pipe/zod.pipe';
import { createTaskSchema, createTaskSchemaType } from './dto/create-task.dto';
import { updateTaskSchema, updateTaskSchemaType } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body(new ZodPipe(createTaskSchema)) body: createTaskSchemaType,
    @Req() { user }: RequestWithUser,
  ) {
    return this.taskService.create(body, user);
  }

  @Get()
  findAll(@Req() { user }: RequestWithUser) {
    return this.taskService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() { user }: RequestWithUser) {
    return this.taskService.findOne(id, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateTaskSchema)) body: updateTaskSchemaType,
    @Req() { user }: RequestWithUser,
  ) {
    return this.taskService.update(id, body, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() { user }: RequestWithUser) {
    return this.taskService.delete(id, user);
  }
}
