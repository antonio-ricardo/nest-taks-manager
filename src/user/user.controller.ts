import { ZodPipe } from 'src/commom/pipe/zod.pipe';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { createUserSchema, createUserSchemaType } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RequestWithUser } from 'src/commom/dto/request-with-user.dto';
import { updateUserSchema, updateUserSchemaType } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body(new ZodPipe(createUserSchema))
    body: createUserSchemaType,
    @Req() { user }: RequestWithUser,
  ) {
    return this.userService.create(body, user);
  }

  @Get()
  findAll(@Req() { user }: RequestWithUser) {
    return this.userService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() { user }: RequestWithUser) {
    return this.userService.findOne(id, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateUserSchema))
    body: updateUserSchemaType,
    @Req() { user }: RequestWithUser,
  ) {
    return this.userService.update(id, body, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() { user }: RequestWithUser) {
    return this.userService.delete(id, user);
  }
}
