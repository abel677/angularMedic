import { IUser } from '.';

export interface IApiResponse {
  status: boolean;
  message: string;
}

export interface IRoles {
  id: number;
  role: string;
}
export interface IAuthResponse extends IApiResponse {
  user: IUser;
  jwt: string;
  roles: IRoles[];
}
