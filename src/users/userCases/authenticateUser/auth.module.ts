import { Module } from '@nestjs/common';
import { AuthRepository } from 'src/users/infra/auth.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';

import jwtConstants from '../../../auth/auth';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret_token,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,

    {
      provide: 'AuthRepositoryInterface',
      useClass: AuthRepository,
    },
  ],
})
export class AuthModule { }
