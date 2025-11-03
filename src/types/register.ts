export interface RegisterData {
  name: string;
  email: string;
  tel: string; 
  address: string;
  userTag: string /* | number */; 
  userImg: File | null; 
  password?: string; 
  confirmPassword?: string;
  securityQuestion: string; 
  securityAnswer: string;
  twoFactorEnabled: boolean; 
  role: "buyer" | "seller";
}
