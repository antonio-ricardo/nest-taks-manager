import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthMiddleware } from 'src/commom/middleware/auth.middleware';
import { RoleMiddleware } from 'src/commom/middleware/user-role.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users*', method: RequestMethod.ALL });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const roleMiddleware = new RoleMiddleware([
          'ORGANIZATION_ADMIN',
          'ADMIN',
        ]);
        return roleMiddleware.use(req, res, next);
      })
      .forRoutes({ path: 'users*', method: RequestMethod.ALL });
  }
}
