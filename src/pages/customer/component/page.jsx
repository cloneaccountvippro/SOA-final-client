import { useState } from 'react';
import { customers } from '../test/data/customer';
import CustomerRow from './row'; 
import '../styles/customer.css'
import { Input } from "@/components/ui/input"

function CustomerPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const customersPerPage = 5;

    // Filter customers based on search query
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const renderTableData = () => {
        if (currentCustomers.length === 0) {
            return (
                <tr>
                    <td colSpan="7" className="text-center">No customers found.</td>
                </tr>
            );
        }

        return currentCustomers.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} />
        ));
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={currentPage === i ? "active" : ""}>
                    <button onClick={() => setCurrentPage(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset pagination to first page when search query changes
    };

    return (
        <div>
            <h1 className='text-3xl font-semibold p-5'>Customer List</h1>
            {/* Search bar */}
            <Input 
                type="text" 
                className='justify-start w-[20%] mb-5'
                placeholder="Enter customer name" 
                value={searchQuery}
                onChange={handleSearchChange}/>
            <div className="table-container">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table>
            </div>
            <ul className="pagination flex justify-center">
                {renderPageNumbers()}
            </ul>
        </div>
    );
}

export default CustomerPage;