/* type Role = "admin" | "buyer" | "seller" */


export interface User {
  id: number;
  name: string;
  email: string;
  role: string; //: Role;
  wallet_balance: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string,
    address: string, 
    tel: string, 
    securityQuestion: string, 
    securityAnswer: string, 
    userTag: string, 
    twoFactorEnabled: boolean, 
    userImg : File | null 
  ) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}