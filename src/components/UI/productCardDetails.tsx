import { Shield, MessageCircle, Users, CheckCircle } from "lucide-react";
import type { Card } from "../../types/component";

const CardDetails: Card[] = [
  {
    id: 1,
    icon: <Shield className="h-7 w-7 text-blue-600" />,
    title: "Secure Escrow",
    description:
      "Your funds are safely held until both parties fulfill their obligations",
    image: "/images/cxure.svg",
    bgColor: "bg-[#e2e4fa]",
    iconBg: "bg-blue-300",
  },
  {
    id: 2,
    icon: <MessageCircle className="h-7 w-7 text-purple-600" />,
    title: "Real-time Chat",
    description:
      "Communicate directly with buyers and sellers within each transaction",
    image: "/images/realchat.svg",
    bgColor: "bg-white",
    iconBg: "bg-purple-100",
  },
  {
    id: 3,
    icon: <CheckCircle className="h-7 w-7  text-[#f1cea2]" />,
    title: "Milestone System",
    description:
      "Break down projects into manageable milestones with separate payments",
    image: "/images/milesteon.svg",
    bgColor: "bg-[#d5e8fd]",
    iconBg: "bg-[#d99426]",
  },
  {
    id: 4,
    icon: <Users className="h-7 w-7 text-orange-600" />,
    title: "Multi-Category",
    description:
      "Freelancing, procurement, and general trade - all in one platform",
    image: "/images/general.svg",
    bgColor: "bg-white",
    iconBg: "bg-orange-100",
  },
];

export default CardDetails;
