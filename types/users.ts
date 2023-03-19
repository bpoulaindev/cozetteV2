export interface CztUsers {
  [key: string]: CztUser;
}

export interface MinimalUser {
  uid: string;
  email: string;
  createdAt: number;
  emailVerified: boolean;
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  lastLoginAt: number;
  isAnonymous: boolean;
}
export interface CztUser {
  id: string;
  displayName: string;
  mail: string;
  photoURL?: string;
  createdAt: number;
  emailVerified: boolean;
}
