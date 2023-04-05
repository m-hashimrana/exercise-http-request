import React from 'react';

const TableCell = ({ title, customWidth, onClick }) => {
	return (
		<td scope='col-2' style={{ width: customWidth }} onClick={onClick}>
			{title}
		</td>
	);
};

export default TableCell;
