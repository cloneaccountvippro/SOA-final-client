/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function StaffDetailPage() {
    const { id } = useParams(); 
    const [staff, setStaff] = useState(null);

    useEffect(() => {
        const fetchStaffDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/Staffs/${id}`);
                setStaff(response.data);
            } catch (error) {
                console.error('Error fetching staff detail:', error);
            }
        };

        fetchStaffDetail();
    }, [id]);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            {staff !== null ? (
                <div className='h-full w-[70%] border-[1px] border-slate-300 rounded-md divide-y'>
                    <h1 className='text-2xl font-semibold flex items-start pl-2 py-1'>{staff.fullName}</h1>
                    <p className='py-2'><strong>Phone Number:</strong> {staff.phoneNumber}</p>
                    <p className='py-2'><strong>Email:</strong> {staff.email}</p>
                    <p className='py-2'><strong>Date of Birth:</strong> {staff.dob}</p>
                    <p className='py-2'><strong>Address:</strong> {staff.address}</p>
                    <p className='py-2'><strong>Gender:</strong> {staff.gender}</p>
                    <p className='py-2'><strong>Position:</strong> {staff.position}</p>
                    <p className='py-2'><strong>Salary:</strong> {staff.salary}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        
    );
}

StaffDetailPage.propTypes = {
    id: PropTypes.string,
};

export default StaffDetailPage;
