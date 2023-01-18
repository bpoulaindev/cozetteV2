export interface CztUsers {
  [key: string]: CztUser;
}

export interface CztUser {
  id: string;
  displayName: string;
  mail: string;
  photoURL?: string;
  createdAt: number;
  emailVerified: boolean;
}
