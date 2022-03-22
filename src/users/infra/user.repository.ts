import { Injectable } from '@nestjs/common';

import users from '../../../fixtures/users.json';
import { IUseRepository } from '../repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUseRepository {
  async findByEmailAndPassword({ email, password }: any): Promise<any> {
    return users.filter(
      (item) => email === item.email && password === item.password,
    )[0];
  }

  async findLevelByRole({ role }): Promise<any> {
    const roles = {
      junior: {
        level: [2],
      },
      middle: {
        level: [1, 2],
      },
      senior: {
        level: [0, 1, 2],
      },
      intern: {
        level: [0, 1, 2],
      },
    };
    return roles[role];
  }
}
