import { useFormik } from 'formik';
import React from 'react';
import Modal from 'react-modal';
import Input from '../common/Input';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const AddUser = ({ modalIsOpen, onModalClose, selectedUser, onChangeHandler, formError, submissionHandler }) => {
	return (
		<Modal isOpen={modalIsOpen} onRequestClose={onModalClose} style={customStyles}>
			<span className='cross' onClick={onModalClose}>
				X
			</span>
			<h4 style={{ textAlign: 'center' }}>{selectedUser?.id ? 'Update User' : 'Add New User'}</h4>
			<form className='userForm' type={'submit'} onChange={onChangeHandler} onSubmit={submissionHandler}>
				<Input name={'name'} label={'Name'} type={'text'} value={selectedUser?.name} formError={formError['name']} />
				<Input
					name={'phone'}
					label={'Phone'}
					type={'text'}
					value={selectedUser?.phone}
					formError={formError['phone']}
				/>
				<Input name={'website'} label={'Website'} type={'text'} value={selectedUser?.website} />
				<Input name={'email'} label={'Email'} type={'text'} value={selectedUser?.email} />
				<Input name={'username'} label={'UserName'} type={'text'} value={selectedUser?.username} />

				<button className='button'>{selectedUser?.id ? 'Update' : 'Submit'}</button>
			</form>
		</Modal>
	);
};

export default AddUser;
