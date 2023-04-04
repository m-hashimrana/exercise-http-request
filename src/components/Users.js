import React, { useEffect, useState } from 'react';
import User from './User';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	const fetchUsers = async () => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users');
			if (!response?.ok) {
				throw new Error('Something went wrong!');
			}
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			setError('Something went wrong!');
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return <div>{error ? <h3 className='errorMessage'>{error}</h3> : <User data={users} />}</div>;
};

export default Users;
