import { Module } from '@nestjs/common';
import { UserRepository } from '../../users/infra/user.repository';
import { OrganizationRepository } from '../infra/organization.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'ProductRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'OrganizationRepositoryInterface',
      useClass: OrganizationRepository,
    },
  ],
})
export class ProductModule { }
