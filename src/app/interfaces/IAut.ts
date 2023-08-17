import { IPerson, IUser } from ".";

export interface IApiResponse {
    status: boolean,
    message: string
}
export interface IAuthResponse extends IApiResponse {
    user:    IUser;
    jwt:     string;
    person:  IPerson[];
}


