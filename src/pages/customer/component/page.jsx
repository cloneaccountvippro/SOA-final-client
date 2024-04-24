import { useState } from 'react';
import { customers } from '../test/data/customer';
// Assuming customers data is imported here

function CustomerPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 5;
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(customers.length / customersPerPage);

    const renderTableData = () => {
        return currentCustomers.map((customer) => {
            const { id, name, age, gender, phone_number, address, email, country } = customer;
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{phone_number}</td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>{country}</td>
                </tr>
            );
        });
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

    return (
        <div>
            <h1>Customer List</h1>
            <table>
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
            <ul className="pagination">
                {renderPageNumbers()}
            </ul>
        </div>
    );
}

export default CustomerPage;
