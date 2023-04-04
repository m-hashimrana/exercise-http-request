import React from 'react';

const TableCell = ({ title, customWidth }) => {
	return (
		<td scope='col-2' className='tableCell' style={{ width: customWidth }}>
			{title}
		</td>
	);
};

export default TableCell;
