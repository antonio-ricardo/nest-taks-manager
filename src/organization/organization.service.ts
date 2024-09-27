import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createOrUpdateOrganizationSchemaType } from './dto/create-or-update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createOrUpdateOrganizationSchemaType) {
    return this.prisma.organization.create({ data });
  }

  async findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(id: string, data: createOrUpdateOrganizationSchemaType) {
    const organizationToUpdate = await this.prisma.organization.findFirst({
      where: { id, deletedAt: null },
    });

    if (!organizationToUpdate) {
      throw new NotFoundException(
        'Não foi possível encontrar a empresa com o ID enviado',
      );
    }

    return await this.prisma.organization.update({ where: { id }, data });
  }

  async delete(id: string) {
    const currentDate = new Date();

    const existSentOrganization = await this.prisma.organization.findUnique({
      where: { id },
    });

    if (!existSentOrganization) {
      throw new NotFoundException(
        'Não foi possível encontrar a empresa com o ID enviado',
      );
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.organization.update({
        where: { id },
        data: { deletedAt: currentDate },
      });

      await prisma.user.updateMany({
        where: { organizationId: id },
        data: { deletedAt: currentDate },
      });

      await prisma.task.updateMany({
        where: { organizationId: id },
        data: { deletedAt: currentDate },
      });
    });

    return await this.prisma.organization.findUnique({ where: { id } });
  }
}
