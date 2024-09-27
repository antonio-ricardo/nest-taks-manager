import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '../dto/request-with-user.dto';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        throw new UnauthorizedException('Token inválido');
      }

      const [type, token] = authHeader.split(' ');

      if (type !== 'Bearer') {
        throw new UnauthorizedException('Token inválido');
      }

      const secret = this.configService.get<string>('JWT_SECRET') || 'secret';
      const decoded = jwt.verify(token, secret) as User;

      (req as RequestWithUser).user = decoded;

      if (!!decoded.deletedAt) {
        throw new UnauthorizedException('Token inválido');
      }
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }

    next();
  }
}
