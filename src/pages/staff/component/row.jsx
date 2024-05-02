import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdOutlineDelete } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';

function StaffRow({ staff }) {
    const { staffId, fullName, phoneNumber, email, gender, position } = staff;
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteStaff = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`http://localhost:3000/api/Staffs/${staffId}`);
            console.log('Staff deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting staff:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <tr key={staffId} className='text-ellipsis'>
            <td className='py-3 px-2'>{fullName}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{position}</td>
            <td>
                <AlertDialog>
                    <AlertDialogTrigger><Button className='bg-white border-[1px] border-red-500 hover:bg-red-500 group px-3'><MdOutlineDelete className='w-4 h-4 fill-red-600 group-hover:fill-white' /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete staff account
                                and remove his/her data from your servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteStaff} disabled={isDeleting}>
                                {isDeleting ? 'Deleting...' : 'Continue'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <NavLink to={`/staff/${staffId}`}>
                    <Button className='bg-white border-[1px] border-blue-500 hover:bg-blue-500 group px-3 ml-2'>
                        <IoInformationCircleOutline className='w-4 h-4 text-blue-600 fill-blue-600 group-hover:fill-white group-hover:text-white' />
                    </Button>
                </NavLink>
            </td>
        </tr>
    );
}

StaffRow.propTypes = {
    staff: PropTypes.shape({
        staffId: PropTypes.number.isRequired,
        fullName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
    }).isRequired
}

export default StaffRow
