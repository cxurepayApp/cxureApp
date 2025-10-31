export interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  status: string;
}

export interface Message {
  id: number;
  sender_id: number;
  sender_name: string;
  message: string;
  timestamp: string;
}