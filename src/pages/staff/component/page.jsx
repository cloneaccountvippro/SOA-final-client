/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import StaffRow from './row'; // Assuming you have a component for rendering staff rows
import '../styles/staff.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import axios from 'axios';

function StaffPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const staffsPerPage = 5;


    useEffect(() => {
        // Function to fetch customers from API
        const fetchStaff = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/Staffs'); // Adjust the URL as per your API endpoint
                setStaffs(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchStaff(); // Call the function when the component mounts
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/Accounts/create', {
                email: email,
                name: fullname,
                gender: gender
            });

            console.log('Staff created successfully:', response.data);
            setEmail('');
            setFullname('');
            setGender('');
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error creating staff:', error);
        }
    };

    // Filter staffs based on search query
    const filteredStaffs = staffs.filter(staff =>
        staff.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastStaff = currentPage * staffsPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
    const currentStaffs = filteredStaffs.slice(indexOfFirstStaff, indexOfLastStaff);

    const totalPages = Math.ceil(filteredStaffs.length / staffsPerPage);

    const renderTableData = () => {
        if (currentStaffs.length === 0) {
            return (
                <tr>
                    <td colSpan="8" className="text-center">No staff found.</td>
                </tr>
            );
        }

        return currentStaffs.map((staff) => (
            <StaffRow key={staff.id} staff={staff} />
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
        setCurrentPage(1);
    };

    return (
        <div>
            <h1 className='text-3xl font-semibold p-5'>Staff List</h1>
            {/* Search bar */}
            <div className='flex flex-row gap-3'>
                <Input
                    type="text"
                    className='justify-start w-[20%] mb-5'
                    placeholder="Enter staff name"
                    value={searchQuery}
                    onChange={handleSearchChange} />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add Staff</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Adding new staff</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    type='email'
                                    id="email"
                                    className="col-span-3"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullname" className="text-right">
                                    Fullname
                                </Label>
                                <Input
                                    id="fullname"
                                    className="col-span-3"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gender" className="text-right">
                                    Gender
                                </Label>
                                <Select id="gender" onValueChange={(value)=>setGender(value)}>
                                    <SelectTrigger className="w-[276px]">
                                        <SelectValue placeholder="Choose gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="table-container">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Gender</th>
                            <th>Position</th>
                            <th>Action</th>
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

export default StaffPage;
