import PropTypes from 'prop-types'; // Import PropTypes

function CustomerRow({ customer }) {
    const { id, name, age, gender, phone_number, address, email, country } = customer;
    
    return (
        <tr key={id} className='text-ellipsis'>
            <td className='py-3 px-2'>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{phone_number}</td>
            <td>{address}</td>
            <td>{email}</td>
            <td>{country}</td>
        </tr>
    );
}

CustomerRow.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
    }).isRequired
};

export default CustomerRow;
