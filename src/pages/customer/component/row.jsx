import PropTypes from 'prop-types'; // Import PropTypes

function CustomerRow({ customer }) {
    const { id, fullName, dob, gender, phoneNumber, address, email, country } = customer;
    
    return (
        <tr key={id} className='text-ellipsis'>
            <td className='py-3 px-2'>{fullName}</td>
            <td>{dob}</td>
            <td>{gender}</td>
            <td>{phoneNumber}</td>
            <td>{address}</td>
            <td>{email}</td>
            <td>{country}</td>
        </tr>
    );
}

CustomerRow.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        fullName: PropTypes.string.isRequired,
        dob: PropTypes.number.isRequired,
        gender: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
    }).isRequired
};

export default CustomerRow;
