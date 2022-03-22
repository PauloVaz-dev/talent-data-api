export interface IUser {
  email: string;
  password: string;
}
export interface IUseRepository {
  findByEmailAndPassword({ email, password }: IUser): Promise<any>;
  findLevelByRole({ role: string }): Promise<any>;
}
