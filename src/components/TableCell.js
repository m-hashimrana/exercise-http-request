import React from 'react';

const TableCell = ({ title, width, onClick }) => {
	return (
		<td scope='col-2' style={{ width: width }} onClick={onClick}>
			{title}
		</td>
	);
};

export default TableCell;
