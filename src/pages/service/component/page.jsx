import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from 'lucide-react';
import { DatePicker } from "@/pages/rooms/components/date_picker";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import BookingService from "./booking_service";

function ServicesPage() {
    const [rooms, setRooms] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/Rooms/booked-room?checkDate=${selectedDate.toISOString()}`);
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                return null;
            }
        };

        if (selectedDate) {
            fetchRooms();
        }
    }, [selectedDate]);


    return (
        <div>
            <div className="flex mb-5">
                <DatePicker
                    text={"Choose date"}
                    date={selectedDate}
                    setDate={setSelectedDate}
                />
            </div>
            <div className="grid grid-cols-4 gap-4">

                {rooms.map((room, index) => (
                    <React.Fragment key={index}>
                        {room.isBooking ? (
                            <Dialog>
                                <DialogTrigger>
                                    <div className="border-[1px] rounded-md w-80 p-3 cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-2xl font-semibold">{room.name}</h2>
                                            <p className="font-semibold">Occupied</p>
                                        </div>
                                        <div className="flex items-center gap-10 pt-3 pb-5">
                                            <User className="w-10 h-10" />
                                            <p className="text-3xl font-semibold">{room.customerName}</p>
                                        </div>
                                        <div className="flex justify-between border-t-[1px] items-center pt-2">
                                            <p className="font-semibold">{room.type}</p>
                                            <p className="font-semibold">{room.days || '0'} days</p>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="min-w-fit">
                                    <div className="flex justify-center w-fit p-3">
                                        <BookingService DBR_id={room.dbR_Id}/>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <div className="border-[1px] rounded-md w-80 p-3 cursor-not-allowed bg-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold">{room.name}</h2>
                                    <p className="font-semibold">Vacant</p>
                                </div>
                                <div className="flex items-center gap-10 pt-3 pb-5">
                                    <User className="w-10 h-10" />
                                    <p className="text-3xl font-semibold">No Booking</p>
                                </div>
                                <div className="flex justify-between border-t-[1px] items-center pt-2">
                                    <p className="font-semibold">{room.type}</p>
                                    <p className="font-semibold">{room.days || '0'} days</p>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>

    );
}

export default ServicesPage;
