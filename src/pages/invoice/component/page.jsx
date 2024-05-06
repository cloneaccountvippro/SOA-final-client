import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import axios from 'axios';

function InvoicePage() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetchInvoices();
    }, []); // Fetch invoices on component mount

    const fetchInvoices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/Invoices/all');
            console.log(response.data)
            setInvoices(response.data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            // Handle error, such as displaying a message to the user
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-semibold mb-3'>Invoice List</h1>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Staff ID</th>
                            <th>Money</th>
                            <th>Customer Id</th>
                            <th>Payments</th>
                            <th>Create Date</th>
                            <th className='w-10'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.invoiceId}>
                                <td>{inv.invoiceId}</td>
                                <td>{inv.staffId}</td>
                                <td>{inv.moneys}$</td>
                                <td>{inv.customerId}</td>
                                <td>{inv.payments}</td>
                                <td>{inv.createDate}</td>
                                <td>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button className='bg-white border-[1px] border-blue-500 hover:bg-blue-500 group px-3 ml-2'>
                                                <IoInformationCircleOutline className='w-4 h-4 text-blue-600 fill-blue-600 group-hover:fill-white group-hover:text-white' />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Invoice Information</DialogTitle>
                                            </DialogHeader>
                                            <div>
                                                <p><strong>Money:</strong> {inv.moneys}</p>
                                                <p><strong>Create Date:</strong> {inv.createDate}</p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoicePage;
