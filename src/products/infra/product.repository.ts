import { Injectable } from '@nestjs/common';

import users from '../../../fixtures/users.json';
import {
  IProduct,
  IProductRepository,
} from '../repository/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  async findProducts({ organizationName, tags }: IProduct): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
