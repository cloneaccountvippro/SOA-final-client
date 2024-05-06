import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { DatePicker } from "./date_picker";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";


function RoomsPage() {
    const [customerData, setCustomerData] = useState({
        idCard: "",
        fullName: "",
        dob: "",
        gender: "",
        address: "",
        email: "",
        country: "",
        phoneNumber: ""
    });

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const staffId = useSelector((state) => state.user.id);
    const [roomsData, setRoomsData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);
    const [checkInDate, setCheckInDate] = useState(today);
    const [checkOutDate, setCheckOutDate] = useState(tomorrow);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAvailableRooms, setShowAvailableRooms] = useState(false);
    const itemsPerPage = 8;

    // Function to handle input change for customer data fields
    const handleCustomerDataChange = (event) => {
        const { name, value } = event.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    // Function to handle input change for phone number
    const handlePhoneNumberChange = async (event) => {
        const idCard = event.target.value;
        // Check if the input contains exactly 10 digits
        if (idCard.length === 3 && /^\d+$/.test(idCard)) {
            try {
                const response = await axios.get(`http://localhost:3000/api/Customers/id-card/${idCard}`);
                const customer = response.data;
                setCustomerData((prevCustomerData) => {
                    if (customer) {
                        // If a customer is found, update other fields with customer's data
                        return {
                            ...prevCustomerData,
                            ...customer
                        };
                    } else {
                        // If no customer is found, reset other fields
                        return {
                            ...prevCustomerData,
                            idCard: idCard,
                            fullName: "",
                            dob: "",
                            gender: "",
                            address: "",
                            email: "",
                            country: "",
                            phoneNumber: ""
                        };
                    }
                });
            } catch (error) {
                console.error('Error fetching customer:', error);
                // Handle error, such as displaying a message to the user
            }
        } else {
            setCustomerData({
                idCard: idCard,
                fullName: "",
                dob: "",
                gender: "",
                address: "",
                email: "",
                country: "",
                phoneNumber: ""
            });
        }
    };


    const fetchRoomsData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/Bookings/room/availble', {
                CheckInDate: checkInDate.toISOString(),
                CheckOutDate: checkOutDate.toISOString()
            });
            const rooms = response.data;
            setRoomsData(rooms);
        } catch (error) {
            console.error('Error fetching rooms data:', error);
            // Handle error, such as displaying a message to the user
        }
    };

    const fetchBookingsData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/Bookings/room');
            const bookings = response.data;
            setBookingsData(bookings);
        } catch (error) {
            console.error('Error fetching bookings data:', error);
            // Handle error, such as displaying a message to the user
        }
    };

    // Fetch rooms and bookings data when the component mounts
    useEffect(() => {
        fetchRoomsData();
        fetchBookingsData();
    }, []);

    // Function to handle room selection
    const handleRoomSelection = (roomId) => {
        setSelectedRooms((prevSelectedRooms) => {
            if (prevSelectedRooms.includes(roomId)) {
                // If room is already selected, deselect it
                return prevSelectedRooms.filter((id) => id !== roomId);
            } else {
                // If room is not selected, select it
                return [...prevSelectedRooms, roomId];
            }
        });
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(roomsData.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate index of the first and last item to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter rooms based on availability
    const availableRooms = roomsData.filter(room => room.isActive);

    // Filter rooms based on pagination and availability
    const currentItems = showAvailableRooms ? availableRooms.slice(indexOfFirstItem, indexOfLastItem) : roomsData.slice(indexOfFirstItem, indexOfLastItem);

    // Check if all customer fields are filled
    const isCustomerDataComplete = Object.values(customerData).every(value => value !== "");

    // Function to book the room
    const bookRoom = async (roomId) => {
        if (!checkInDate || !checkOutDate) {
            alert("Please select check-in and check-out dates before booking a room.");
            return;
        }
        if (checkOutDate <= checkInDate) {
            alert("Check-out date must be after the check-in date.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/api/Bookings/room/${roomId}`, {
                checkInDate: checkInDate.toISOString().slice(0, 10),
                checkOutDate: checkOutDate.toISOString().slice(0, 10)
            });
            // Handle success, e.g., show a success message
            console.log("Room booked successfully:", response.data);
            // After successfully booking, fetch updated bookings data
            fetchRoomsData()
            fetchBookingsData();
        } catch (error) {
            console.error('Error booking room:', error);
            // Handle error, such as displaying an error message
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:3000/api/Bookings/room/${bookingId}`);
            // After successfully deleting the booking, fetch updated bookings data
            fetchRoomsData()
            fetchBookingsData();
        } catch (error) {
            console.error('Error deleting booking:', error);
            // Handle error, such as displaying an error message
        }
    };

    const clearAllBookings = async () => {
        try {
            await axios.delete('http://localhost:3000/api/Bookings/room/all');
            // After successfully clearing all bookings, fetch updated bookings data
            fetchRoomsData()
            fetchBookingsData();
        } catch (error) {
            console.error('Error clearing all bookings:', error);
            // Handle error, such as displaying an error message
        }
    };

    const createRoomInvoice = async () => {
        try {
            const payload = {
                StaffId: staffId,
                IdCard: customerData.idCard,
                FullName: customerData.fullName,
                Gender: customerData.gender,
                DOB: customerData.dob,
                Address: customerData.address,
                Phone: customerData.phoneNumber,
                Email: customerData.email,
                Country: customerData.country,
            };

            const response = await axios.post(`http://localhost:3000/api/Bookings/create`, payload);
            console.log("Room booked successfully:", response.data);
            fetchBookingsData();
        } catch (error) {
            console.error('Error booking room:', error);
        }
    }


    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex border-[1px] border-slate-300 rounded-sm w-fit p-5 space-x-7">
                {/* Customer Section */}
                <div>
                    <h2 className="font-semibold text-2xl">Customer Information</h2>
                    <form className="w-[400px] mt-5">
                        {/* Input field for phone number */}
                        <div className="flex items-center gap-2 justify-between">
                            <label htmlFor="idCard">Identify Card:</label>
                            <Input
                                type="tel"
                                id="idCard"
                                name="idCard"
                                value={customerData.idCard}
                                onChange={handlePhoneNumberChange}
                                className="w-[70%]"
                                placeholder={customerData.idCard ? "Enter identify card id to find customer" : "Enter identify card id"}
                            />
                        </div>

                        {/* Input fields for customer data */}
                        {Object.keys(customerData).map((key) => {
                            if (key !== "idCard" && key !== 'customerId') { // Exclude phone number field from rendering
                                return (
                                    <div key={key} className="flex items-center gap-2 my-2 justify-between">
                                        <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}:</label>
                                        <Input
                                            type="text"
                                            id={key}
                                            name={key}
                                            value={customerData[key]}
                                            onChange={handleCustomerDataChange}
                                            className="w-[70%]"
                                        />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </form>
                    {/* Button to submit customer data */}
                    <Button
                        disabled={!isCustomerDataComplete || bookingsData.length === 0}
                        className="mt-3"
                        onClick={createRoomInvoice}
                    >
                        Booking Room
                    </Button>
                </div>
                {/* Room Section */}

                <div>
                    <h1 className="font-semibold text-2xl mb-5">Rooms</h1>
                    <div className="flex justify-between mb-3">
                        <div>
                            <p className="font-semibold">Check in</p>
                            <DatePicker text={"Check in date"} date={checkInDate} setDate={setCheckInDate} />
                        </div>
                        <div>
                            <p className="font-semibold">Check out date</p>
                            <DatePicker text={"Check out date"} date={checkOutDate} setDate={setCheckOutDate} />
                        </div>
                    </div>
                    <div style={{ overflowY: 'auto', maxHeight: '250px' }}>
                        <table className="border-collapse border border-gray-400 w-[400px]">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-2 w-[33%]">Name</th>
                                    <th className="border border-gray-400 p-2 w-[33%]">Type</th>
                                    <th className="border border-gray-400 p-2 w-[33%]">Price</th>
                                    <th className="border border-gray-400 p-2 w-[33%]">Actions</th> {/* Add this */}
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((room) => (
                                    <tr
                                        key={room.roomId}
                                        className={room.isActive ? (selectedRooms.includes(room.roomId) ? "" : '') : "bg-gray-200"}
                                        onClick={() => handleRoomSelection(room.roomId)}
                                    >
                                        <td className="border border-gray-400 p-2">{room.name}</td>
                                        <td className="border border-gray-400 p-2">{room.type}</td>
                                        <td className="border border-gray-400 p-2">{room.price}$</td>
                                        <td className="border border-gray-400 p-2">
                                            {room.isActive && <Button onClick={() => bookRoom(room.roomId)}>Add</Button>}
                                        </td> {/* Add this */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Bookings Table */}
                <div className="">
                    <h1 className="font-semibold text-2xl">Bookings</h1>
                    <table className="border-collapse border border-gray-400 w-[400px] mt-3">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 p-2">Room Name</th>
                                <th className="border border-gray-400 p-2">Check-In Date</th>
                                <th className="border border-gray-400 p-2">Check-Out Date</th>
                                <th className="border border-gray-400 p-2">Actions</th> {/* Add this */}
                            </tr>
                        </thead>
                        <tbody>
                            {bookingsData.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="border border-gray-400 p-2">{booking.name}</td>
                                    <td className="border border-gray-400 p-2">{booking.checkInDate}</td>
                                    <td className="border border-gray-400 p-2">{booking.checkOutDate}</td>
                                    <td className="border border-gray-400 p-2">
                                        <Button onClick={() => deleteBooking(booking.roomId)} className='bg-white border-[1px] border-red-500 hover:bg-red-500 group px-3'>
                                            <MdOutlineDelete className='w-4 h-4 fill-red-600 group-hover:fill-white' />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button onClick={clearAllBookings} disabled={bookingsData.length === 0} className="mt-3" variant="destructive">Clear All Bookings</Button>
                </div>
            </div>

        </div>
    );
}

export default RoomsPage;
