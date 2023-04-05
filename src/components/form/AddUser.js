import React, { useState } from 'react';
import Modal from 'react-modal';
import Label from './Label';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const AddUser = ({ modalIsOpen, closeModal, data, setUsers, isEdit }) => {
	// const [id, setId] = useState(10);
	const [newUser, setNewUser] = useState({
		// id: setId(id + 1),
		name: '',
		email: '',
		phone: '',
		website: '',
		username: '',
	});

	const onChangeHandler = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};
	const submissionHandler = async (e) => {
		console.log('my new user', newUser);
		e.preventDefault();
		console.log('vents', e);
		try {
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

			setNewUser(newUser);
			setUsers([...data, newUser]);
			setNewUser({
				name: '',
				email: '',
				phone: '',
				website: '',
				username: '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={customStyles}>
			<button onClick={closeModal}>close</button>
			<h4 style={{ textAlign: 'center' }}>Add New User</h4>
			<form className='userForm' type={'submit'} onChange={onChangeHandler} onSubmit={submissionHandler}>
				<Label title={'Name'} htmlFor={'name'} />
				<input name='name' type={'text'} value={newUser.name} />

				<Label title={'Phone'} htmlFor={'phone'} />
				<input name='phone' type={'number'} value={newUser?.phone} />

				<Label title={'Website'} htmlFor={'website'} />
				<input name='website' type={'text'} value={newUser?.website} />

				<Label title={'Email'} htmlFor={'email'} />
				<input name='email' type={'email'} value={newUser?.email} />

				<Label title={'username'} htmlFor={'username'} />
				<input name='username' type={'text'} value={newUser?.username} />

				<button className='button'>Submit</button>
			</form>
		</Modal>
	);
};

export default AddUser;
