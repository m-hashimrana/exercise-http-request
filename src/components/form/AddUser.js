import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { handleUserSubmission } from '../../utils/services/api';
import Input from '../common/Input';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const AddUser = ({
	modalIsOpen,
	onModalClose,
	selectedUser,
	setError,
	onChangeHandler,
	formError,
	setFormError,
	updatedUserHandler,
	addUserHandler,
}) => {
	const requiredField = {
		name: true,
		phone: true,
	};

	const submissionHandler = async (e) => {
		e.preventDefault();

		if (requiredField.name && !selectedUser?.name) {
			setFormError((prevFormError) => ({ ...prevFormError, name: 'name is required' }));
			return;
		}
		if (
			requiredField.phone &&
			(!selectedUser?.phone || selectedUser.phone.length !== 11 || isNaN(selectedUser.phone))
		) {
			setFormError((prevFormError) => ({ ...prevFormError, phone: 'phone must be exactly 11 digits' }));
			return;
		}

		try {
			handleUserSubmission(selectedUser);
			if (selectedUser?.id) {
				updatedUserHandler();
				toast('Updated the user successfully');
			} else {
				addUserHandler();
				toast.success('User is Added successfully');
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<Modal isOpen={modalIsOpen} onRequestClose={onModalClose} contentLabel='Example Modal' style={customStyles}>
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
