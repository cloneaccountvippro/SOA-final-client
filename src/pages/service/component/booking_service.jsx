import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";

function BookingService({DBR_id}) {
    const staffId = useSelector((state) => state.user.id);
    const [services, setServices] = useState([]);
    const [bookingServices, setBookingServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/Services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchBookingServices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/BookingServices/service');
            setBookingServices(response.data);
        } catch (error) {
            console.error('Error fetching booking services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchBookingServices();
    }, []);

    // Function to handle service selection
    const handleServiceSelection = (serviceId) => {
        setSelectedServices((prevSelectedServices) => {
            if (prevSelectedServices.includes(serviceId)) {
                // If service is already selected, deselect it
                return prevSelectedServices.filter((id) => id !== serviceId);
            } else {
                // If service is not selected, select it
                return [...prevSelectedServices, serviceId];
            }
        });
    };

    // Function to handle adding service to booking
    const handleAddToBooking = async (serviceId) => {
        try {
            const selectedService = services.find(service => service.serviceId === serviceId);
            if (selectedService) {
                await axios.post(`http://localhost:3000/api/BookingServices/service/${serviceId}`, {
                    name: selectedService.name,
                    price: selectedService.price
                });
                // After successfully adding the service, refetch booking services
                fetchBookingServices();
            }
        } catch (error) {
            console.error('Error adding service to booking:', error);
        }
    };

    const handleDeleteFromBooking = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:3000/api/BookingServices/service/${serviceId}`);
            // After successfully deleting the service, refetch booking services
            fetchBookingServices();
        } catch (error) {
            console.error('Error deleting service from booking:', error);
        }
    };

    // Function to handle deleting all booking services
    const handleDeleteAllBookingServices = async () => {
        try {
            await axios.delete('http://localhost:3000/api/BookingServices/service/all');
            // After successfully deleting all booking services, refetch booking services
            fetchBookingServices();
        } catch (error) {
            console.error('Error deleting all booking services:', error);
        }
    };

    // Function to handle calling detail-room-booking API
    const handleDetailRoomBooking = async (DBR_id) => {
        try {
            await axios.post(`http://localhost:3000/api/BookingServices/detail-room-booking/${DBR_id}/?StaffId=${staffId}`);
            // Perform any additional actions if needed
            fetchBookingServices();
        } catch (error) {
            console.error('Error calling detail-room-booking API:', error);
        }
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(services.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate index of the first and last item to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get current items based on pagination
    const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col">
                <div className="flex border-[1px] border-slate-300 rounded-sm w-full p-5 space-x-7">
                    {/* Service Section */}
                    <div>
                        <h1 className="font-semibold text-2xl mb-5">Services</h1>
                        <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                            <table className="border-collapse border border-gray-400 w-[400px]">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 p-2 w-[66%]">Name</th>
                                        <th className="border border-gray-400 p-2 w-[33%]">Price</th>
                                        <th className="border border-gray-400 p-2 w-[33%]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((service) => (
                                        <tr
                                            key={service.serviceId}
                                            onClick={() => handleServiceSelection(service.serviceId)}
                                        >
                                            <td className="border border-gray-400 p-2">{service.name}</td>
                                            <td className="border border-gray-400 p-2">{service.price}$</td>
                                            <td className="border border-gray-400 p-2">
                                                <Button onClick={() => handleAddToBooking(service.serviceId)} className="bg-green-500 text-white px-4 py-2 rounded-md">Add</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-5 flex justify-end">
                                <div className="space-x-2">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <Button key={i} onClick={() => handlePageChange(i + 1)} className="w-2 h-[30px]">
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Booking Service Section */}
                    <div>
                        <h1 className="font-semibold text-2xl mb-5">Booking Services</h1>
                        <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                            <table className="border-collapse border border-gray-400 w-[400px]">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 p-2 w-[66%]">Name</th>
                                        <th className="border border-gray-400 p-2 w-[33%]">Price</th>
                                        <th className="border border-gray-400 p-2 w-[33%]">Amount</th>
                                        <th className="border border-gray-400 p-2 w-[33%]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingServices.map((bookingService) => (
                                        <tr key={bookingService.serviceId}>
                                            <td className="border border-gray-400 p-2">{bookingService.name}</td>
                                            <td className="border border-gray-400 p-2">{bookingService.price}$</td>
                                            <td className="border border-gray-400 p-2">{bookingService.amount}</td>
                                            <td className="border border-gray-400 p-2">
                                                <Button onClick={() => handleDeleteFromBooking(bookingService.serviceId)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons outside the table */}
            <div className="flex mt-5 w-full gap-3 justify-end">
                <Button disabled={bookingServices.length === 0}  onClick={() => handleDetailRoomBooking(DBR_id)}>Booking Service</Button>
                <Button onClick={handleDeleteAllBookingServices} variant="destructive">Cancel</Button>
            </div>
        </div>
    );
}

export default BookingService;
