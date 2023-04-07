import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/services/api';
import AddUser from '../form/AddUser';
import User from '../User';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const closeModal = () => {
		setIsOpen(false);
		setSelectedUser(null);
	};

	useEffect(() => {
		fetchUsers(setUsers, setError);
	}, [fetchUsers]);

	const editClickHandler = (user) => {
		setSelectedUser(user);
		setIsOpen(true);
	};

	return (
		<div>
			<button className='button' onClick={() => setIsOpen(true)}>
				Add User
			</button>
			{error ? <h3 className='errorMessage'>{error}</h3> : <User data={users} editClickHandler={editClickHandler} />}
			<AddUser
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				data={users}
				setUsers={setUsers}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
			/>
		</div>
	);
};

export default Users;
