export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  name: string;
}

export interface User extends Register {
  id: string;
  isAdmin: boolean;
}

export type UpdateUser = Partial<Omit<User, 'id'>>;
