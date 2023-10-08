export interface Login {
  username: string;
  password: string;
}

export interface UserIdentity { 
  username: string | null;
  usertype: string;
}

export interface UserStore { 
  identity: UserIdentity;
  token: string;
  picture: string;
}