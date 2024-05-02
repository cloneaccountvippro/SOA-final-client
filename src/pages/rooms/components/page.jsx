import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';

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

    const [roomsData, setRoomsData] = useState([]);
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
        const phoneNumber = event.target.value;
        // Check if the input contains exactly 10 digits
        if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
            try {
                const response = await axios.get(`http://localhost:3000/api/Customers/phone-number/${phoneNumber}`);
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
                            idCard: "",
                            fullName: "",
                            dob: "",
                            gender: "",
                            address: "",
                            email: "",
                            country: "",
                            phoneNumber: phoneNumber
                        };
                    }
                });
            } catch (error) {
                console.error('Error fetching customer:', error);
                // Handle error, such as displaying a message to the user
            }
        } else {
            setCustomerData({
                idCard: "",
                fullName: "",
                dob: "",
                gender: "",
                address: "",
                email: "",
                country: "",
                phoneNumber: phoneNumber
            });
        }
    };

    const fetchRoomsData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/Rooms');
            const rooms = response.data;
            setRoomsData(rooms);
        } catch (error) {
            console.error('Error fetching rooms data:', error);
            // Handle error, such as displaying a message to the user
        }
    };

    // Fetch rooms data when the component mounts
    useEffect(() => {
        fetchRoomsData();
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

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex border-[1px] border-slate-300 rounded-sm w-fit p-5 space-x-7">
                {/* Customer Section */}
                <div>
                    <h2 className="font-semibold text-2xl">Customer Information</h2>
                    <form className="w-[400px] mt-5">
                        {/* Input field for phone number */}
                        <div className="flex items-center gap-2 justify-between">
                            <label htmlFor="phone">Phone Number:</label>
                            <Input
                                type="tel"
                                id="phone"
                                name="phone_number"
                                value={customerData.phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="w-[70%]"
                                placeholder="Enter phone number to find customer"
                            />
                        </div>
                        {/* Input fields for customer data */}
                        {Object.keys(customerData).map((key) => {
                            if (key !== "phoneNumber" && key !== 'customerId') { // Exclude phone number field from rendering
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
                    <Button disabled={!isCustomerDataComplete} className="mt-3">Booking Room</Button>
                </div>
                {/* Room Section */}
                <div>
                    <h1 className="font-semibold text-2xl mb-5">Rooms</h1>
                    <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                        <table className="border-collapse border border-gray-400 w-[400px]">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-2 w-[33%]">Name</th>
                                    <th className="border border-gray-400 p-2 w-[33%]">Type</th>
                                    <th className="border border-gray-400 p-2 w-[33%]">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((room) => (
                                    <tr
                                        key={room.roomId}
                                        className={room.isActive ? (selectedRooms.includes(room.roomId) ? "bg-blue-500 cursor-pointer" : "hover:bg-blue-300 cursor-pointer") : "bg-gray-200"}
                                        onClick={() => handleRoomSelection(room.roomId)}
                                    >
                                        <td className="border border-gray-400 p-2">{room.name}</td>
                                        <td className="border border-gray-400 p-2">{room.type}</td>
                                        <td className="border border-gray-400 p-2">{room.price}$</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="mt-5  flex justify-end">
                        <div className="space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button key={i} onClick={() => handlePageChange(i + 1)} className="w-2 h-[30px]">
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {/* Button to toggle available rooms */}
                    <Button onClick={() => setShowAvailableRooms(!showAvailableRooms)} className="">
                        {showAvailableRooms ? "Show All Rooms" : "Show Available Rooms Only"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RoomsPage;
