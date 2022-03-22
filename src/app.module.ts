import { Module } from '@nestjs/common';
import { ProductRepository } from './products/infra/product.repository';
import { UserRepository } from './users/infra/user.repository';
import { ProductController } from './products/userCases/product.controller';
import { ProductModule } from './products/userCases/product.module';
import { ProductService } from './products/userCases/product.service';
import { AuthRepository } from './users/infra/auth.repository';
import { AuthController } from './users/userCases/authenticateUser/auth.controller';
import { AuthModule } from './users/userCases/authenticateUser/auth.module';
import { AuthService } from './users/userCases/authenticateUser/auth.service';
import { PassportModule } from '@nestjs/passport';
import { OrganizationRepository } from './products/infra/organization.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [AuthController, ProductController],
  providers: [
    AuthService,
    ProductService,
    {
      provide: 'AuthRepositoryInterface',
      useClass: AuthRepository,
    },
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'OrganizationRepositoryInterface',
      useClass: OrganizationRepository,
    },
  ],
})
export class AppModule { }
