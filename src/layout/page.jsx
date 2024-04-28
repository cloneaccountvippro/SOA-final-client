import CustomerPage from "@/pages/customer";
import { Sidebar } from "./sidebar/page";
import StaffPage from "@/pages/staff";
import StaffDetailPage from "@/pages/staff/component/detail";
import RoomsPage from "@/pages/rooms";

export const AppLayout = () => {
    return (
        <div className="flex h-screen w-screen flex-col">
            <div className="absolute z-40">
                <Sidebar></Sidebar>
            </div>
            <div className="ml-[16vw] p-5">
                {/* <CustomerPage/> */}
                {/* <StaffPage/> */}
                {/* <StaffDetailPage/> */}
                <RoomsPage/>
            </div>
        </div>
    ); 
}
