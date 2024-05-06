/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

function StaffDetailPage() {
    const { id } = useParams(); 
    const [staff, setStaff] = useState(null);
    const [editedStaff, setEditedStaff] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const user = useSelector((state) => state.user); // Get the user data from Redux store

    useEffect(() => {
        console.log(user.id)
        const fetchStaffDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/Staffs/${id}`);
                setStaff(response.data);
                setEditedStaff(response.data);
            } catch (error) {
                console.error('Error fetching staff detail:', error);
            }
        };

        fetchStaffDetail();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStaff({ ...editedStaff, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            setIsSaving(true);
            await axios.put(`http://localhost:3000/api/Staffs/${id}`, editedStaff);
            console.log('Changes saved successfully');
            setStaff(editedStaff);
            fetchStaffDetail()
        } catch (error) {
            console.error('Error saving changes:', error);
        } finally {
            setIsSaving(false);
        }
    };

    
    // Check if the user is a manager and has the same ID as the staff being viewed
    const isManager = user.position === "manager" || user.id.toString() === id;

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            {staff !== null ? (
                <div className='h-full w-[70%] border-[1px] border-slate-300 rounded-md divide-y'>
                    <h1 className='text-2xl font-semibold flex items-start pl-2 py-1'>{staff.fullName}</h1>
                    <input type="text" name="phoneNumber" value={editedStaff.phoneNumber} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    <input type="text" name="email" value={editedStaff.email} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    <input type="text" name="dob" value={editedStaff.dob} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    <input type="text" name="address" value={editedStaff.address} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    <input type="text" name="gender" value={editedStaff.gender} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    <input type="text" name="position" value={editedStaff.position} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    <input type="text" name="salary" value={editedStaff.salary} onChange={handleInputChange} className="py-2 pl-2 w-full" />
                    {isManager && ( // Render the button only if user is a manager and has the same ID
                        <button onClick={handleSaveChanges} disabled={JSON.stringify(staff) === JSON.stringify(editedStaff) || isSaving} className="py-2 px-4 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    )}
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
