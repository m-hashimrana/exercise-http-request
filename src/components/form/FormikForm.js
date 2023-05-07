import { useFormik } from 'formik';
import React from 'react';
import Input from '../common/Input';

const initialValues = {
	name: '',
};

const FormikForm = () => {
	const { values, handleChange, handleSubmit, handleBlur } = useFormik({
		initialValues: initialValues,
		onSubmit: (values) => {
			console.log('ccccc', values);
		},
	});
	return (
		<form onSubmit={handleSubmit}>
			<Input type={'text'} name={'name'} value={values.name} placeholder='enter name' onChange={handleChange} />
			<button> submit</button>
		</form>
	);
};

export default FormikForm;
