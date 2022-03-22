export interface IAuth {
  email: string;
  password: string;
}
export interface IAuthRepository {
  findByEmailAndPassword({ email, password }: IAuth): Promise<any>;
}
