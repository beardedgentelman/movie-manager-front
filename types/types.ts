export interface IUser {
  id: number | null;
  name: string;
  email: string;
  movies: IMovie[];
}
export interface IMovie {
  id: number | null;
  title: string;
  publishing_year: number;
  poster: string;
}
export interface IRegistration {
  name: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IAuthState {
  user: IUser | null;
  accessToken: string;
}

export interface IRegistrationErrorResponse {
  message?: string;
}

export type UploadFile = {
  base_url: string;
  id: number;
  name: string;
  original_name: string;
  size: number;
  type: string;
};

export enum HeaderTitle {
  MY_MOVIES = 'My movies',
  CREATE = 'Create a new movie',
  EDIT = 'Edit',
}
