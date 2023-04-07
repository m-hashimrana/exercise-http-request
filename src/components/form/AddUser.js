import React from 'react';
import Modal from 'react-modal';
import { handleUserSubmission } from '../../utils/services/api';
import Label from './Label';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const AddUser = ({ modalIsOpen, closeModal, data, setUsers, isEdit, selectedUser, setSelectedUser }) => {
	const onChangeHandler = (e) => {
		setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
	};
	const submissionHandler = async (e) => {
		e.preventDefault();
		handleUserSubmission(isEdit, selectedUser, data, setUsers, setSelectedUser, closeModal);
	};

	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={customStyles}>
			<span className='cross' onClick={closeModal}>
				X
			</span>
			<h4 style={{ textAlign: 'center' }}>{isEdit ? 'Update User' : 'Add New User'}</h4>
			<form className='userForm' type={'submit'} onChange={onChangeHandler} onSubmit={submissionHandler}>
				<Label title={'Name'} htmlFor={'name'} />
				<input name='name' type={'text'} value={selectedUser?.name} />

				<Label title={'Phone'} htmlFor={'phone'} />
				<input name='phone' type={'text'} value={selectedUser?.phone} />

				<Label title={'Website'} htmlFor={'website'} />
				<input name='website' type={'text'} value={selectedUser?.website} />

				<Label title={'Email'} htmlFor={'email'} />
				<input name='email' type={'email'} value={selectedUser?.email} />

				<Label title={'username'} htmlFor={'username'} />
				<input name='username' type={'text'} value={selectedUser?.username} />

				<button className='button'>{isEdit ? 'Update' : 'Submit'}</button>
			</form>
		</Modal>
	);
};

export default AddUser;
