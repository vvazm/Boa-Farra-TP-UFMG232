export interface Login {
  username: string;
  password: string;
}

export interface UserIdentity { 
  username: string | null;
}

export interface UserStore { 
  identity: UserIdentity;
  token: string;
  picture: string;
}