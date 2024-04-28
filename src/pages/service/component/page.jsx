import { useState } from "react";
import { services } from "../test/data/service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { customers } from "@/pages/customer/test/data/customer";

function ServicesPage() {
    const [customerData, setCustomerData] = useState({
        name: "",
        age: "",
        gender: "",
        address: "",
        email: "",
        country: "",
        phone_number: ""
    });

    const [selectedServices, setSelectedServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Function to handle input change for customer data fields
    const handleCustomerDataChange = (event) => {
        const { name, value } = event.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    const handlePhoneNumberChange = (event) => {
        const phoneNumber = event.target.value;
        setCustomerData((prevCustomerData) => {
            const foundCustomer = customers.find((customer) => customer.phone_number === phoneNumber);
            if (foundCustomer) {
                // If a customer is found, update other fields with customer's data
                const { phone_number, ...customerWithoutPhoneNumber } = foundCustomer; // Exclude phone number from update
                return {
                    ...prevCustomerData,
                    ...customerWithoutPhoneNumber
                };
            } else {
                // If no customer is found, reset other fields
                return {
                    ...prevCustomerData,
                    name: "",
                    age: "",
                    gender: "",
                    address: "",
                    email: "",
                    country: "",
                    phone_number: phoneNumber
                };
            }
        });
    };

    // Function to handle room selection
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

    // Check if all customer fields are filled
    const isCustomerDataComplete = Object.values(customerData).every(value => value !== "");

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex border-[1px] border-slate-300 rounded-sm w-fit p-5 space-x-7">
                {/* Customer Section */}
                <div>
                    <h2 className="font-semibold text-2xl">Customer Information</h2>
                    <form className="w-[400px] mt-5">
                        <div className="flex items-center gap-2 justify-between">
                            <label htmlFor="phone">Phone Number:</label>
                            <Input
                                type="tel"
                                id="phone"
                                name="phone_number"
                                value={customerData.phone_number}
                                onChange={handlePhoneNumberChange}
                                className="w-[70%]"
                                placeholder="Enter phone number to find customer"
                            />
                        </div>
                        {/* Input fields for customer data */}
                        {Object.keys(customerData).map((key) => {
                            if (key !== "phone_number" && key !== 'id') { // Exclude phone number field from rendering
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
                    <Button disabled={!isCustomerDataComplete} className="mt-3">Booking Service</Button>
                </div>
                {/* Service Section */}
                <div>
                    <h1 className="font-semibold text-2xl mb-5">Services</h1>
                    <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                        <table className="border-collapse border border-gray-400 w-[400px]">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-2 w-[66%]">Name</th>
                                    <th className="border border-gray-400 p-2 w-[33%]">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((service) => (
                                    <tr
                                        key={service.id}
                                        className={selectedServices.includes(service.id) ? "bg-blue-500 cursor-pointer" : "hover:bg-blue-300 cursor-pointer"}
                                        onClick={() => handleServiceSelection(service.id)}
                                    >
                                        <td className="border border-gray-400 p-2">{service.name}</td>
                                        <td className="border border-gray-400 p-2">{service.price}$</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-5  flex justify-end">
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
            </div>
        </div>
    );
}

export default ServicesPage;
