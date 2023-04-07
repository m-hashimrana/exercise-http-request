import React from 'react';
import Modal from 'react-modal';
import Label from './Label';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const handleUserSubmission = async (isEdit, selectUser, data, setUsers, setSelectUser, closeModal) => {
	try {
		if (isEdit) {
			let updatedUser = [
				{
					...selectUser,
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
				setSelectUser({
					...selectUser,
				});
			}
			let updatedUserAtIndex = [...data];
			updatedUserAtIndex[userIndex] = selectUser;
			setUsers(updatedUserAtIndex);
			closeModal();
		} else {
			const user_id = data[data.length - 1].id + 1;
			const response = await fetch('https://jsonplaceholder.typicode.com/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(selectUser),
			});

			if (!response.ok) {
				throw new Error('Failed to create user!');
			}
			closeModal();
			setUsers([...data, { ...selectUser, id: user_id }]);
		}
	} catch (error) {
		console.error(error);
	}
};

const AddUser = ({ modalIsOpen, closeModal, data, setUsers, isEdit, selectUser, setSelectUser }) => {
	const onChangeHandler = (e) => {
		setSelectUser({ ...selectUser, [e.target.name]: e.target.value });
	};
	const submissionHandler = async (e) => {
		e.preventDefault();
		handleUserSubmission(isEdit, selectUser, data, setUsers, setSelectUser, closeModal);
	};

	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={customStyles}>
			<span className='cross' onClick={closeModal}>
				X
			</span>
			<h4 style={{ textAlign: 'center' }}>{isEdit ? 'Update User' : 'Add New User'}</h4>
			<form className='userForm' type={'submit'} onChange={onChangeHandler} onSubmit={submissionHandler}>
				<Label title={'Name'} htmlFor={'name'} />
				<input name='name' type={'text'} value={selectUser?.name} />

				<Label title={'Phone'} htmlFor={'phone'} />
				<input name='phone' type={'text'} value={selectUser?.phone} />

				<Label title={'Website'} htmlFor={'website'} />
				<input name='website' type={'text'} value={selectUser?.website} />

				<Label title={'Email'} htmlFor={'email'} />
				<input name='email' type={'email'} value={selectUser?.email} />

				<Label title={'username'} htmlFor={'username'} />
				<input name='username' type={'text'} value={selectUser?.username} />

				<button className='button'>{isEdit ? 'Update' : 'Submit'}</button>
			</form>
		</Modal>
	);
};

export default AddUser;
