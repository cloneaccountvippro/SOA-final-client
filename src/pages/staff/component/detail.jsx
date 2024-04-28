import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function StaffDetailPage() {
    const { id } = useParams(); 
    const [staff, setStaff] = useState(null);

    // Simulated function to fetch staff data from an API
    // const fetchStaffDetails = async () => {
    //     try {
    //         // You would replace this with actual API call to fetch staff details
    //         const response = await fetch(`/api/staff/${id}`);
    //         const data = await response.json();
    //         setStaff(data);
    //     } catch (error) {
    //         console.error('Error fetching staff details:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchStaffDetails();
    // }, [id]);

    // if (!staff) {
    //     return <div>Loading...</div>;
    // }

    // const { fullname, phone_number, email, dob, address, gender, position, salary } = staff;

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='h-full w-[70%] border-[1px] border-slate-300 rounded-md divide-y'>
            <h1 className='text-2xl font-semibold flex items-start pl-2 py-1'>Kien</h1>
            <p className='py-2'><strong>Phone Number:</strong> 12</p>
            <p className='py-2'><strong>Email:</strong> 122</p>
            <p className='py-2'><strong>Date of Birth:</strong> 123</p>
            <p className='py-2'><strong>Address:</strong> 123</p>
            <p className='py-2'><strong>Gender:</strong> 123</p>
            <p className='py-2'><strong>Position:</strong> 123</p>
            <p className='py-2'><strong>Salary:</strong> 123</p>
        </div>
        </div>
        
    );
}

StaffDetailPage.propTypes = {
    id: PropTypes.string.isRequired,
};

export default StaffDetailPage;
