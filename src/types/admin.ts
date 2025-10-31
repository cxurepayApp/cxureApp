import { User } from "./auth";

export interface EscrowAccount {
  id: number;
  transaction_id: number;
  amount: number;
  status: string;
  transaction_title: string;
  category: string;
  buyer_name: string;
  seller_name: string;
  created_at: string;
}

export interface AdminUser extends User {
    created_at: string;
}