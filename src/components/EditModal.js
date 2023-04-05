import React, { useState } from 'react';
import Modal from 'react-modal';
import Label from './form/Label';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const EditModal = ({ selectUser, modalIsOpen, closeModal }) => {
	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={customStyles}>
			<button onClick={closeModal}>close</button>
			<h4 style={{ textAlign: 'center' }}>Edit User Information</h4>
			<form className='userForm'>
				<Label title={'Name'} htmlFor={'name'} />
				<input type={'text'} value={selectUser?.name} />
				<Label title={'Phone'} htmlFor={'phone'} />
				<input type={'text'} value={selectUser?.phone} />
				<Label title={'Website'} htmlFor={'name'} />
				<input type={'text'} value={selectUser?.website} />

				<button className='button'>Update</button>
			</form>
		</Modal>
	);
};

export default EditModal;
