import { ZodPipe } from './../commom/pipe/zod.pipe';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  createOrUpdateOrganizationSchema,
  createOrUpdateOrganizationSchemaType,
} from './dto/create-or-update-organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(
    @Body(new ZodPipe(createOrUpdateOrganizationSchema))
    body: createOrUpdateOrganizationSchemaType,
  ) {
    return this.organizationService.create(body);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(createOrUpdateOrganizationSchema))
    body: createOrUpdateOrganizationSchemaType,
  ) {
    return this.organizationService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.delete(id);
  }
}
