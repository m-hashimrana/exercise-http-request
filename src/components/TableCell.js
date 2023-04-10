import React from 'react';

const TableCell = ({ title, customWidth, onEdit }) => {
	return (
		<td scope='col-2' style={{ width: customWidth }} onClick={onEdit}>
			{title}
		</td>
	);
};

export default TableCell;
