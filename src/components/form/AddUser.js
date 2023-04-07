import React from 'react';
import Modal from 'react-modal';
import { handleUserSubmission } from '../../utils/services/api';
import Input from '../common/Input';

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
				<Input name={'name'} label={'Name'} type={'text'} value={selectedUser?.name} />
				<Input name={'phone'} label={'Phone'} type={'text'} value={selectedUser?.phone} />
				<Input name={'website'} label={'Website'} type={'text'} value={selectedUser?.website} />
				<Input name={'email'} label={'Email'} type={'text'} value={selectedUser?.email} />
				<Input name={'username'} label={'UserName'} type={'text'} value={selectedUser?.username} />

				<button className='button'>{isEdit ? 'Update' : 'Submit'}</button>
			</form>
		</Modal>
	);
};

export default AddUser;
