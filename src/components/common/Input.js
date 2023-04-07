import React from 'react';

const Input = ({ label, value, name, type }) => {
	return (
		<div className='d-flex flex-column ' style={{ margin: '5px 0' }}>
			<label style={{ margin: '3px 0' }} htmlFor={name}>
				{label}
			</label>
			<input name={name} type={type} value={value} />
		</div>
	);
};

export default Input;
