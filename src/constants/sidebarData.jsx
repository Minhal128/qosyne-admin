import { MdDashboard, MdOutlineSyncAlt } from 'react-icons/md';
import { BiSupport } from "react-icons/bi";
import { LuUser } from "react-icons/lu";

export const adminNav = [
    {
        id: 1,
        link: "home",
        name: "Home",
        icon: <MdDashboard className='text-[#FFCC00]' />
    },
    {
        id: 2,
        link: "user",
        name: "User Managements",
        icon: <LuUser className="text-[#FF2D55]" />
    },
    {
        id: 3,
        link: "transaction",
        name: "Transaction",
        icon: <MdOutlineSyncAlt className="text-[#34C759]" />
    },
    {
        id: 4,
        link: "support",
        name: "Support",
        icon: <BiSupport className="text-[#34C759]" />
    }
]