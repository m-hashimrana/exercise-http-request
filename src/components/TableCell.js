import React from 'react';

const TableCell = ({ title, width, onClick, cursor, textAlign }) => {
	return (
		<td style={{ width, cursor, textAlign }} onClick={onClick}>
			{title}
		</td>
	);
};

export default TableCell;
