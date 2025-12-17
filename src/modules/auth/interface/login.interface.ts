export interface ResponseAuth {
  userId: string;
  name: string;
  email: string;
}

export interface UserEntity extends ResponseAuth {
  password: string;
}

export interface PayloadRFToken extends ResponseAuth {
  iat: number;
  exp: number;
}
