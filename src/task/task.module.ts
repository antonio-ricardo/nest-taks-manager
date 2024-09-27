import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthMiddleware } from 'src/commom/middleware/auth.middleware';
import { RoleMiddleware } from 'src/commom/middleware/user-role.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'tasks*', method: RequestMethod.ALL });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const roleMiddleware = new RoleMiddleware([
          'ORGANIZATION_ADMIN',
          'USER',
        ]);
        return roleMiddleware.use(req, res, next);
      })
      .forRoutes({ path: 'tasks*', method: RequestMethod.GET });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const roleMiddleware = new RoleMiddleware([
          'ORGANIZATION_ADMIN',
          'USER',
        ]);
        return roleMiddleware.use(req, res, next);
      })
      .forRoutes({ path: 'tasks*', method: RequestMethod.PUT });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const roleMiddleware = new RoleMiddleware([
          'ORGANIZATION_ADMIN',
          'USER',
        ]);
        return roleMiddleware.use(req, res, next);
      })
      .forRoutes({ path: 'tasks*', method: RequestMethod.DELETE });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const roleMiddleware = new RoleMiddleware(['ORGANIZATION_ADMIN']);
        return roleMiddleware.use(req, res, next);
      })
      .forRoutes({ path: 'tasks*', method: RequestMethod.POST });
  }
}
