import React, { useEffect, useState } from 'react';
import User from './User';

const Users = () => {
	const [employees, setEmployees] = useState([]);
	const [error, setError] = useState(null);

	const fetchUsers = async () => {
		setError(null);
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users');

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const data = await response.json();

			const loadedEmplyees = [];
			for (let keys in data) {
				loadedEmplyees.push({
					id: data[keys]?.id,
					userName: data[keys]?.username,
					name: data[keys]?.name,
					phone: data[keys]?.phone,
					email: data[keys]?.email,
					website: data[keys]?.website,
				});
			}
			setEmployees(loadedEmplyees);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return <div>{error ? <h3 className='errorMessage'>{error?.message}</h3> : <User data={employees} />}</div>;
};

export default Users;
