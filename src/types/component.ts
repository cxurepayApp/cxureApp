// export interface Card {
//   id?: number;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   image: string;
//   bgColor?: string;
// }

export interface Card {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  iconBg?: string; // 👈 Add this
}
