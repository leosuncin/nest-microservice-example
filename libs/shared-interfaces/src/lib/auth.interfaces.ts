export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface User extends Register {
  id: string;
  isAdmin: boolean;
}
