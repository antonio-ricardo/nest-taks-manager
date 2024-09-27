import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  use(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException(
        'Acesso negado, o usuário não tem permissão para acessar essa rota',
      );
    }

    next();
  }
}
