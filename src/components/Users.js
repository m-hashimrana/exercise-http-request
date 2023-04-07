import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';
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
		setSelectUser(null);
		setIsEdit(false);
	}

	useEffect(
		useCallback(() => {
			fetchUsers(setUsers, setError);
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
