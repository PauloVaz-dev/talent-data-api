export interface IOrganization {
  organizationName: string;
  level: number[];
}
export interface IOrganizationRepository {
  findByNameAndLevel({ organizationName, level }: IOrganization): Promise<any>;
}
