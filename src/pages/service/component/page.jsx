import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

function ServicesPage() {
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

    const [services, setServices] = useState([]);
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


    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/Services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

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
                                        key={service.serviceId}
                                        className={selectedServices.includes(service.serviceId) ? "bg-blue-500 cursor-pointer" : "hover:bg-blue-300 cursor-pointer"}
                                        onClick={() => handleServiceSelection(service.serviceId)}
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
