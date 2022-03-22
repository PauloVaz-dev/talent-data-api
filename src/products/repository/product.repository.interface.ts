export interface IProduct {
  organizationName: string;
  tags: string;
}
export interface IProductRepository {
  findProducts({ organizationName, tags }: IProduct): Promise<any>;
}
