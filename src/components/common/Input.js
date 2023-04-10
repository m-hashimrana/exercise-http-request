import React from 'react';

const Input = ({ label, value, name, type, formError }) => {
	return (
		<div className='d-flex flex-column ' style={{ margin: '5px 0' }}>
			<label style={{ margin: '3px 0' }} htmlFor={name}>
				{label}
			</label>
			<input name={name} type={type} value={value} />
			{formError && <p className='errorMessage'>{formError}</p>}
		</div>
	);
};
export default Input;
