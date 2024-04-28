import { Sidebar } from "./sidebar/page";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
    return (
        <div className="flex h-screen w-screen flex-col">
            <div className="absolute z-40">
                <Sidebar></Sidebar>
            </div>
            <div className="ml-[16vw] p-5">
                <Outlet/>
            </div>
        </div>
    ); 
}
