import React, { useCallback, useEffect, useState } from 'react';
import AddUser from './form/AddUser';
import User from './User';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectUser, setSelectUser] = useState(null);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

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

	useEffect(
		useCallback(() => {
			fetchUsers();
		}, [fetchUsers]),
		[]
	);

	function editClickHandler(user) {
		setSelectUser(user);
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
				selectUser={selectUser}
				setSelectUser={setSelectUser}
				isEdit={isEdit}
			/>
		</div>
	);
};

export default Users;
