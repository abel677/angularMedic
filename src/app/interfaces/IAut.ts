import { IPerson, IUser } from ".";

export interface IAuthResponse {
    success: boolean;
    user:    IUser;
    jwt:     string;
    person:  IPerson;
}



