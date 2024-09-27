import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createUserSchemaType } from './dto/create-user.dto';
import { updateUserSchemaType } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createUserSchemaType, user: User) {
    if (
      user.role === 'ORGANIZATION_ADMIN' &&
      user.organizationId !== data.organizationId
    ) {
      throw new BadRequestException(
        'Usuários administradores da empresa só podem criar usuários para empresa que pertecem',
      );
    }

    if (data.password) {
      data.password = this.getHashedPassword(data.password);
    }

    return await this.prisma.user.create({ data });
  }

  async findAll(user: User) {
    if (user.role === 'ORGANIZATION_ADMIN') {
      return await this.prisma.user.findMany({
        where: { organizationId: user.organizationId },
      });
    }

    return await this.prisma.user.findMany();
  }

  async findOne(id: string, user: User) {
    if (user.role === 'ORGANIZATION_ADMIN') {
      return await this.prisma.user.findUnique({
        where: { id: id, organizationId: user.organizationId },
      });
    }

    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: updateUserSchemaType, user: User) {
    const userToUpdate = this.getUserByIdAndUser(id, user);

    if (!userToUpdate) {
      throw new NotFoundException(
        'Não foi possível encontrar o usuário com o ID enviado',
      );
    }

    if (data.password) {
      data.password = this.getHashedPassword(data.password);
    }

    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string, user: User) {
    const userToDelete = this.getUserByIdAndUser(id, user);

    if (!userToDelete) {
      throw new NotFoundException(
        'Não foi possível encontrar o usuário com o ID enviado',
      );
    }

    const currentDate = new Date();

    await this.prisma.$transaction(async (prisma) => {
      await this.prisma.user.update({
        where: { id },
        data: { deletedAt: currentDate },
      });

      await prisma.task.updateMany({
        where: { userId: id },
        data: { deletedAt: currentDate },
      });
    });

    return await this.prisma.user.findUnique({ where: { id } });
  }

  private async getUserByIdAndUser(id: string, user: User) {
    if (user.role === 'ORGANIZATION_ADMIN') {
      return await this.prisma.user.findFirst({
        where: { id, deletedAt: null, organizationId: user.organizationId },
      });
    }

    return await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  private getHashedPassword(password: string) {
    return hashSync(password, 1);
  }
}
