import React from 'react';

const TableCell = ({ title, width, onClick, cursor, textAlign }) => {
	return (
		<td scope='col-2' style={{ width, cursor, textAlign }} onClick={onClick}>
			{title}
		</td>
	);
};

export default TableCell;
