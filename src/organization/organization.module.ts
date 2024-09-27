import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { AuthMiddleware } from 'src/commom/middleware/auth.middleware';
import { RoleMiddleware } from 'src/commom/middleware/user-role.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'organizations', method: RequestMethod.ALL });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const roleMiddleware = new RoleMiddleware(['ADMIN']);
        return roleMiddleware.use(req, res, next);
      })
      .forRoutes({ path: 'organizations', method: RequestMethod.ALL });
  }
}
