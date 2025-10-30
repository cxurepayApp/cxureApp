import {
  Shield,
  MessageCircle,
  Users,
  CheckCircle,
} from "lucide-react";
import { Card } from "../../types/component";

const CardDetails : Card[] = [
    {
        icon:Shield,
        title:"Secure Escrow",
        description:"Your funds are safely held until both parties fulfill their obligations",
        image:"/images/cxure.svg"
    },
    {
        icon:MessageCircle,
        title:"Real-time Chat",
        description:" Communicate directly with buyers and sellers within each ransaction",
        image:"/images/realchat.svg"
    },
    {
        icon:CheckCircle,
        title:"Milestone System",
        description:"Break down projects into manageable milestones with separate payments",
        image:"/images/milesteon.svg"
    },
    {
        icon:Users,
        title:"Multi-Category",
        description:" Freelancing, procurement, and general trade - all in one platform",
        image:"/images/general.svg"
    
    }

]

export default CardDetails;