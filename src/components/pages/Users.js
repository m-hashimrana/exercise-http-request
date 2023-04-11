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

	const updatedUserHandler = () => {
		const toBeUpdated = users?.find((user) => user.id === selectedUser?.id);
		const userIndex = users?.findIndex((user) => user.id === selectedUser.id);
		if (toBeUpdated) {
			setSelectedUser({
				...selectedUser,
			});
		}
		let updatedUserAtIndex = [...users];
		updatedUserAtIndex[userIndex] = selectedUser;
		setUsers(updatedUserAtIndex);
		onModalClose();
	};

	const addUserHandler = () => {
		const user_id = users[users.length - 1].id + 1;

		onModalClose();
		setUsers([...users, { ...selectedUser, id: user_id }]);
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
				selectedUser={selectedUser}
				setError={setError}
				handleDisappearError={handleDisappearError}
				onChangeHandler={onChangeHandler}
				formError={formError}
				setFormError={setFormError}
				updatedUserHandler={updatedUserHandler}
				addUserHandler={addUserHandler}
			/>
		</div>
	);
};

export default Users;
