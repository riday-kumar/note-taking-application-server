export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  interests: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}
