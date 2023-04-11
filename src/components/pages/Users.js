import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createUser, fetchUsers, updateUser } from '../../utils/services/api';
import AddUser from '../form/AddUser';
import User from '../User';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [formError, setFormError] = useState({});

	const requiredField = {
		name: true,
		phone: true,
	};
	const validate = () => {
		const phone = requiredField?.phone;
		const errorObject = {};
		if (requiredField?.name && !selectedUser?.name) {
			errorObject['name'] = 'name is required';
		}
		if (phone && !selectedUser?.phone) {
			errorObject['phone'] = 'phone is required';
		} else if (phone && selectedUser?.phone?.length !== 11) {
			errorObject['phone'] = 'phone should be of 11 digits';
		} else if (phone && isNaN(selectedUser?.phone)) {
			errorObject['phone'] = 'Please Enter digits only';
		} else {
			return errorObject;
		}
		return errorObject;
	};

	const handleDisappearError = () => {
		setFormError({});
	};
	const onChangeHandler = (e) => {
		handleDisappearError();
		setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
	};

	const handleModalClose = () => {
		setIsOpen(false);
		setSelectedUser(null);
		setFormError({});
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

	const handleUpdateUser = () => {
		try {
			updateUser(selectedUser);
			const userIndex = users?.findIndex((user) => user?.id === selectedUser?.id);
			let updatedUserAtIndex = [...users];
			updatedUserAtIndex[userIndex] = selectedUser;
			setUsers(updatedUserAtIndex);
			handleModalClose();
			toast.success('User is updated successfully');
		} catch (error) {
			toast.error('check your connection');
			handleModalClose();
		}
	};

	const handleAddUser = (selectedUser) => {
		try {
			createUser(selectedUser);
			const user_id = users[users.length - 1].id + 1;
			handleModalClose();
			setUsers([...users, { ...selectedUser, id: user_id }]);
		} catch (error) {
			toast.error('check your connection');
			handleModalClose();
		}
	};

	const submissionHandler = (e) => {
		e.preventDefault();
		const error = validate();
		setFormError(error);
		if (Object.keys(error).length === 0) {
			if (!selectedUser?.id) {
				handleAddUser(selectedUser);
			} else {
				handleUpdateUser(selectedUser);
			}
		}
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
				<User data={users} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} />
			)}
			<AddUser
				modalIsOpen={modalIsOpen}
				onModalClose={handleModalClose}
				selectedUser={selectedUser}
				onChangeHandler={onChangeHandler}
				formError={formError}
				submissionHandler={submissionHandler}
			/>
		</div>
	);
};

export default Users;
