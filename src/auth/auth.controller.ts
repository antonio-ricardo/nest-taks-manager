import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginSchema, loginSchemaType } from './dto/login.dto';
import { ZodPipe } from 'src/commom/pipe/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ZodPipe(loginSchema))
    body: loginSchemaType,
  ) {
    return this.authService.login(body);
  }
}
