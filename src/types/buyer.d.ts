export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  status: string;
  //Combbine dashboard's transaction interface, seller's and buyer's? Or do I just leave them separate?
  buyer_name?: string;
  seller_name?: string;
  created_at: string;
}