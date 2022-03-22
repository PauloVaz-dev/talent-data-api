import { Injectable } from '@nestjs/common';

import organizations from '../../../fixtures/organization.json';
import {
  IOrganization,
  IOrganizationRepository,
} from '../repository/organization.repository.interface';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  async findByNameAndLevel({
    organizationName,
    level,
  }: IOrganization): Promise<any[]> {
    return organizations.filter((item) => {
      return item.name === organizationName && level.includes(item.level);
    });
  }
}
