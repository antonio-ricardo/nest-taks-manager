import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createTaskSchemaType } from './dto/create-task.dto';
import { updateTaskSchemaType } from './dto/update-task.dto';
import { User } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createTaskSchemaType, user: User) {
    return await this.prisma.task.create({
      data,
    });
  }

  async findAll(user: User) {
    if (user.role === 'ORGANIZATION_ADMIN') {
      return await this.prisma.task.findMany({
        where: {
          organizationId: user.organizationId as string,
          deletedAt: null,
        },
      });
    }

    return await this.prisma.task.findMany({
      where: {
        userId: user.id,
        deletedAt: null,
      },
    });
  }

  async findOne(id: string, user: User) {
    return await this.getTaskByUser(id, user);
  }

  async update(id: string, data: updateTaskSchemaType, user: User) {
    const taskToUpdate = this.getTaskByUser(id, user);

    if (!taskToUpdate) {
      throw new NotFoundException(
        'Não foi possível encontrar a tarefa com o ID enviado',
      );
    }

    return await this.prisma.task.update({ where: { id }, data });
  }

  async delete(id: string, user: User) {
    const taskToDelete = this.getTaskByUser(id, user);

    if (!taskToDelete) {
      throw new NotFoundException(
        'Não foi possível encontrar a tarefa com o ID enviado',
      );
    }

    return await this.prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async getTaskByUser(id: string, user: User) {
    if (user.role === 'ORGANIZATION_ADMIN') {
      return await this.prisma.task.findUnique({
        where: {
          id,
          organizationId: user.organizationId as string,
          deletedAt: null,
        },
      });
    }

    return await this.prisma.task.findUnique({
      where: {
        id,
        userId: user.id,
        deletedAt: null,
      },
    });
  }
}
