import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/services/api';
import AddUser from '../form/AddUser';
import User from '../User';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const closeModal = () => {
		setIsOpen(false);
		setSelectedUser(null);
		setIsEdit(false);
	};

	// useEffect(
	// 	useCallback(() => {
	// 		fetchUsers(setUsers, setError);
	// 	}, [fetchUsers]),
	// 	[]
	// );
	useEffect(() => {
		console.log('hello');
		fetchUsers(setUsers, setError);
	}, [fetchUsers]);

	function editClickHandler(user) {
		setSelectedUser(user);
		setIsEdit(true);
		setIsOpen(true);
	}

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
				isEdit={isEdit}
			/>
		</div>
	);
};

export default Users;
