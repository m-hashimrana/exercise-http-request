import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createUser, fetchUsers, updateUser } from '../../utils/services/api';
import { fetchPosts } from '../../utils/services/postApi';
import AddUser from '../form/AddUser';
import AddUserFormik from '../form/AddUserFormik';
import FormikForm from '../form/FormikForm';
import User from '../User';
import UserPosts from './UserPosts';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [formError, setFormError] = useState({});
	const [searchUser, setSearchUser] = useState('');

	// const requiredField = {
	// 	name: true,
	// 	phone: true,
	// };

	// const validate = () => {
	// 	const phone = requiredField?.phone;
	// 	const errorObject = {};
	// 	if (requiredField?.name && !selectedUser?.name) {
	// 		errorObject['name'] = 'name is required';
	// 	}
	// 	if (phone && !selectedUser?.phone) {
	// 		errorObject['phone'] = 'phone is required';
	// 	} else if (phone && selectedUser?.phone?.length !== 11) {
	// 		errorObject['phone'] = 'phone should be of 11 digits';
	// 	} else if (phone && isNaN(selectedUser?.phone)) {
	// 		errorObject['phone'] = 'Please Enter digits only';
	// 	} else {
	// 		return errorObject;
	// 	}
	// 	return errorObject;
	// };

	const handleDisappearError = () => {
		setFormError({});
	};
	const onChangeHandler = (e) => {
		handleDisappearError();
		setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
	};

	const handleModalClose = () => {
		setSelectedUser(null);
		setIsOpen(false);
		setFormError({});
	};

	const handleFetchUsers = async () => {
		const totalUsers = await fetchUsers();
		if (searchUser) {
			const searchedUser = totalUsers?.filter((user) => user?.name.toLowerCase().includes(searchUser));
			setUsers(searchedUser);
		} else {
			setUsers(totalUsers);
		}
	};
	useEffect(() => {
		handleFetchUsers();
	}, [searchUser]);

	const handleUpdateUser = (selectedUser, values) => {
		try {
			updateUser(selectedUser);
			const userIndex = users?.findIndex((user) => user?.id === selectedUser?.id);
			if (userIndex === -1) return;
			console.log('index ', userIndex);
			let updatedUserAtIndex = [...users];
			updatedUserAtIndex[userIndex] = values;
			console.log('at index ', updatedUserAtIndex[userIndex]);
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
			toast.success('User is added successfully');
		} catch (error) {
			toast.error('check your connection');
			handleModalClose();
		}
	};

	return (
		<div>
			<button
				className='button'
				onClick={() => {
					setSelectedUser(null);
					setIsOpen(true);
				}}
			>
				Add User
			</button>
			<input
				className='searchUser'
				placeholder='search...'
				value={searchUser}
				onChange={(e) => setSearchUser(e.target.value)}
			/>
			<User data={users} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} />
			{/* <AddUser
				modalIsOpen={modalIsOpen}
				onModalClose={handleModalClose}
				selectedUser={selectedUser}
				onChangeHandler={onChangeHandler}
				formError={formError}
				submissionHandler={submissionHandler}
			/> */}
			<AddUserFormik
				modalIsOpen={modalIsOpen}
				onModalClose={handleModalClose}
				selectedUser={selectedUser}
				handleAddUser={handleAddUser}
				handleUpdateUser={handleUpdateUser}
			/>
		</div>
	);
};

export default Users;
