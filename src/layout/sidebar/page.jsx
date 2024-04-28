import LogoutButton from "./component/logout_tab";
import SidebarTab from "./component/sidebar_tab"
import { IoMdPeople } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { MdOutlineRoomService } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import {useState} from 'react';
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
    const [selectedTab, setSelectedTab] = useState('Customer')
    return (
        <div className="h-screen w-[16vw] border-r p-3 flex flex-col justify-between">
            {/* User section */} 
            <div className=" space-y-2">
                <NavLink to={"/customer"}>
                    <SidebarTab 
                        name="Customer" 
                        select = {selectedTab === "Customer"} 
                        onClick={setSelectedTab}
                    >
                        <IoMdPeople className="w-5 h-5"/>
                    </SidebarTab>
                </NavLink>
                <NavLink to={"/staff"}>
                    <SidebarTab 
                        name="Staff" 
                        select = {selectedTab === "Staff"} 
                        onClick={setSelectedTab}
                    >
                        <IoMdPeople className="w-5 h-5"/>
                    </SidebarTab>
                </NavLink>
                <NavLink to={"/rooms"}>
                    <SidebarTab 
                    name="Rooms" 
                    select = {selectedTab === "Rooms"} 
                    onClick={setSelectedTab}
                    >
                        <MdMeetingRoom className="w-5 h-5"/>
                    </SidebarTab>
                </NavLink>
                
                <NavLink to={"/service"}>
                    <SidebarTab 
                        name="Service" 
                        select = {selectedTab === "Service"} 
                        onClick={setSelectedTab}
                    >
                        <MdOutlineRoomService className="w-5 h-5"/>
                    </SidebarTab>
                </NavLink>
                <NavLink to={"/invoice"}>
                    <SidebarTab 
                        name="Invoice" 
                        select = {selectedTab === "Invoice"} 
                        onClick={setSelectedTab}
                    >
                        <TbFileInvoice className="w-5 h-5"/>
                    </SidebarTab>
                </NavLink>
            </div>  
            <div className="w-full">
                <LogoutButton/>
            </div>
        </div>
    )
}
