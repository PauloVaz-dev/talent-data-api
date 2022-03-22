import { HttpException, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import auth from 'src/auth/auth';
import {
  IUser,
  IUseRepository,
} from 'src/users/repositories/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepositoryInterface')
    private userRepository: IUseRepository,
  ) { }

  async validateUser({ email, password }: IUser): Promise<any | null> {
    const user = await this.userRepository.findByEmailAndPassword({
      email,
      password,
    });

    if (!user) return null;

    return {
      email: user.email,
      userId: user.userId,
    };
  }

  async login({ email, password }: IUser): Promise<any> {
    const user = await this.userRepository.findByEmailAndPassword({
      email,
      password,
    });

    if (!user) {
      throw new HttpException('User not found', 401);
    }

    const token = sign(
      { roles: user.roles, email: user.email },
      auth.secret_token,
      {
        subject: user.userId,
        expiresIn: auth.expires_in_token,
      },
    );
    return {
      token,
    };
  }
}
