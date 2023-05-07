import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Input from '../common/Input';
import { useFormik } from 'formik';
import { userSchema } from '../../schemas';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};
const initialValues = {
	name: '',
	phone: '',
	website: '',
	email: '',
	username: '',
};

const AddUserFormik = ({ modalIsOpen, onModalClose, selectedUser, handleAddUser, handleUpdateUser }) => {
	const formik = useFormik({
		initialValues: selectedUser || initialValues,
		enableReinitialize: true,
		validationSchema: userSchema,
		onSubmit: (values) => {
			if (!selectedUser) handleAddUser(values);
			else handleUpdateUser(selectedUser, values);
		},
	});

	useEffect(() => {
		if (selectedUser) {
			formik.setValues(selectedUser);
		}
	}, [selectedUser]);
	return (
		<Modal isOpen={modalIsOpen} onRequestClose={onModalClose} style={customStyles}>
			<span className='cross' onClick={onModalClose}>
				X
			</span>
			<h4 style={{ textAlign: 'center' }}>{selectedUser?.id ? 'Update User' : 'Add New User'}</h4>
			<form className='userForm' onSubmit={formik?.handleSubmit}>
				<Input
					name={'name'}
					value={formik?.values?.name}
					label={'Name'}
					type={'text'}
					onChange={formik?.handleChange}
					onBlur={formik?.handleBlur}
					formError={formik.errors.name}
				/>
				<Input
					name={'phone'}
					value={formik?.values?.phone}
					label={'Phone'}
					type={'text'}
					onChange={formik?.handleChange}
					onBlur={formik?.handleBlur}
					formError={formik.errors.phone}
				/>
				<Input
					name={'website'}
					value={formik?.values?.website}
					label={'Website'}
					type={'text'}
					onChange={formik?.handleChange}
					onBlur={formik?.handleBlur}
				/>
				<Input
					name={'email'}
					value={formik?.values?.email}
					label={'Email'}
					type={'text'}
					onChange={formik?.handleChange}
					onBlur={formik?.handleBlur}
					formError={formik.errors.email}
				/>
				<Input
					name={'username'}
					value={formik?.values?.username}
					label={'UserName'}
					type={'text'}
					onChange={formik?.handleChange}
					onBlur={formik?.handleBlur}
				/>

				<button className='button'>{selectedUser?.id ? 'Update' : 'Submit'}</button>
			</form>
		</Modal>
	);
};

export default AddUserFormik;
