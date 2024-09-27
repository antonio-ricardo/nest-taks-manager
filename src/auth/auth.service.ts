import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { loginSchemaType } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login({
    username,
    password,
  }: loginSchemaType): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: { name: username },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Senha ou nome do usuário está incorreto',
      );
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(
        'Senha ou nome do usuário está incorreto',
      );
    }

    const accessToken = jwt.sign(
      user,
      this.configService.get<string>('JWT_SECRET') || 'secret',
      {
        expiresIn: '1h',
      },
    );

    return { accessToken };
  }
}
