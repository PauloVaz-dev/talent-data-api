import { HttpException, Inject, Injectable } from '@nestjs/common';

import { ProductDTO } from '../dto/product.input';

import {
  IProduct,
  IProductRepository,
} from '../repository/product.repository.interface';
import { IUseRepository } from '../../users/repositories/user.repository.interface';
import { IOrganizationRepository } from '../repository/organization.repository.interface';
import { processLineByLine } from 'src/utils/readFile';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private productRepository: IProductRepository,
    @Inject('UserRepositoryInterface')
    private userRepository: IUseRepository,
    @Inject('OrganizationRepositoryInterface')
    private organizationRepository: IOrganizationRepository,
  ) { }

  async findProducts({
    organizationName,
    tags,
    roles,
  }: ProductDTO): Promise<any> {
    const { level } = await this.userRepository.findLevelByRole({
      role: roles,
    });

    const organizations = await this.organizationRepository.findByNameAndLevel({
      level,
      organizationName,
    });

    const products = await processLineByLine(organizations, tags);

    return { total: products.length, products: products };
  }
}
