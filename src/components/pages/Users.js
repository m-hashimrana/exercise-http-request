import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/services/api';
import AddUser from '../form/AddUser';
import User from '../User';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [formError, setFormError] = useState({});

	const handleDisappearError = () => {
		setFormError({});
	};
	const onChangeHandler = (e) => {
		handleDisappearError();
		setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
	};

	const onModalClose = () => {
		setIsOpen(false);
		setSelectedUser(null);
	};

	const fetchUserList = useCallback(() => {
		try {
			fetchUsers(setUsers, setError);
		} catch (error) {
			setError(error);
		}
	}, []);

	useEffect(() => {
		fetchUserList();
	}, [fetchUserList]);

	const editClickHandler = (user) => {
		setSelectedUser(user);
		setIsOpen(true);
	};

	return (
		<div>
			<button className='button' onClick={() => setIsOpen(true)}>
				Add User
			</button>
			{error ? (
				<h1 className='errorMessage' style={{ fontSize: '20px', fontWeight: 'bolder' }}>
					{error}
				</h1>
			) : (
				<User data={users} editClickHandler={editClickHandler} />
			)}
			<AddUser
				modalIsOpen={modalIsOpen}
				onModalClose={onModalClose}
				data={users}
				setUsers={setUsers}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
				error={error}
				setError={setError}
				handleDisappearError={handleDisappearError}
				onChangeHandler={onChangeHandler}
				formError={formError}
				setFormError={setFormError}
			/>
		</div>
	);
};

export default Users;
