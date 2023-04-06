import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Label from './Label';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const AddUser = ({ modalIsOpen, closeModal, data, setUsers, isEdit, selectUser, setSelectUser }) => {
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		phone: '',
		website: '',
		username: '',
	});
	useEffect(() => {
		if (selectUser) {
			setNewUser(selectUser);
		}
	}, [selectUser]);
	const onChangeHandler = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};
	const submissionHandler = async (e) => {
		e.preventDefault();
		try {
			if (selectUser) {
				let updatedUser = [
					{
						...selectUser,
						[e.target.name]: e.target.value,
					},
				];
				const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectUser.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedUser),
				});
				if (!response.ok) {
					throw new Error('Failed to update user!');
				}

				const toBeUpdated = data?.find((user) => user.id === selectUser?.id);
				const userIndex = data?.findIndex((user) => user.id === selectUser.id);
				if (toBeUpdated) {
					setNewUser({
						name: newUser?.name,
						phone: newUser?.phone,
						website: newUser?.website,
						email: newUser?.email,
						username: newUser?.username,
					});
				}
				let updatedUserAtIndex = [...data];
				updatedUserAtIndex[userIndex] = newUser;
				setUsers(updatedUserAtIndex);
				setSelectUser(null);
			} else {
				const user_id = data[data.length - 1].id + 1;
				const response = await fetch('https://jsonplaceholder.typicode.com/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newUser),
				});
				if (!response.ok) {
					throw new Error('Failed to create user!');
				}

				setUsers([...data, { ...newUser, id: user_id }]);

				setNewUser({
					name: '',
					email: '',
					phone: '',
					website: '',
					username: '',
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={customStyles}>
			<span className='cross' onClick={closeModal}>
				X
			</span>
			<h4 style={{ textAlign: 'center' }}>{!selectUser === null ? 'Update User' : 'Add New User'}</h4>
			<form className='userForm' type={'submit'} onChange={onChangeHandler} onSubmit={submissionHandler}>
				<Label title={'Name'} htmlFor={'name'} />
				<input name='name' type={'text'} value={newUser?.name} />

				<Label title={'Phone'} htmlFor={'phone'} />
				<input name='phone' type={'text'} value={newUser?.phone} />

				<Label title={'Website'} htmlFor={'website'} />
				<input name='website' type={'text'} value={newUser?.website} />

				<Label title={'Email'} htmlFor={'email'} />
				<input name='email' type={'email'} value={newUser?.email} />

				<Label title={'username'} htmlFor={'username'} />
				<input name='username' type={'text'} value={newUser?.username} />

				<button className='button'>{!isEdit ? 'Submit' : 'Update'}</button>
			</form>
		</Modal>
	);
};

export default AddUser;
