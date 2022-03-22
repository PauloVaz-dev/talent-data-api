import { Injectable } from '@nestjs/common';
import {
  IAuth,
  IAuthRepository,
} from '../repositories/auth.repository.interface';
import users from '../../../fixtures/users.json';

@Injectable()
export class AuthRepository implements IAuthRepository {
  async findByEmailAndPassword({ email, password }: IAuth): Promise<any> {
    return users.filter(
      (item) => email === item.email && password === item.password,
    )[0];
  }
}
