import PropTypes from 'prop-types'; // Import PropTypes

function StaffRow({staff}){
    const { id, fullname, phone_number, email, dob, address, gender, position, salary } = staff;
    
    return (
        <tr key={id} className='text-ellipsis'>
            <td className='py-3 px-2'>{fullname}</td>
            <td>{phone_number}</td>
            <td>{email}</td>
            <td>{dob}</td>
            <td>{address}</td>
            <td>{gender}</td>
            <td>{position}</td>
            <td>{salary}</td>
        </tr>
    );
}

StaffRow.propTypes = {
    staff: PropTypes.shape({
        id: PropTypes.number.isRequired,
        fullname: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired
    }).isRequired
}

export default StaffRow
