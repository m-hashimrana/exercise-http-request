import React, { useEffect, useState } from 'react';
import TableCell from './TableCell';

const User = ({ data, editClickHandler }) => {
	return (
		<div>
			<table className='table'>
				<thead className='thead-light'>
					<tr>
						<TableCell title={'ID'} customWidth={'3%'} />
						<TableCell title={'Name'} customWidth={'17%'} />
						<TableCell title={'Email'} customWidth={'15%'} />
						<TableCell title={'Phone'} />
						<TableCell title={'Website'} customWidth={'15%'} />
						<TableCell title={'UserName'} customWidth={'10%'} />
						<TableCell title={''} customWidth={'10%'} />
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<TableCell title={`${user?.id}`} customWidth={'3%'} />
							<TableCell title={`${user?.name}`} customWidth={'17%'} />
							<TableCell title={`${user?.email}`} customWidth={'15%'} />
							<TableCell title={`${user?.phone}`} />
							<TableCell title={`${user?.website}`} customWidth={'15%'} />
							<TableCell title={`${user?.username}`} customWidth={'10%'} />
							<TableCell title={`Edit`} onClick={() => editClickHandler(user)} customWidth={'10%'} />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
