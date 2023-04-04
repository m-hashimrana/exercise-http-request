import React, { useState } from 'react';
import TableCell from './TableCell';

const User = ({ data }) => {
	return (
		<div>
			<table className='table'>
				<thead className='thead-light'>
					<tr>
						<TableCell title={'ID'} customWidth={'5%'} />
						<TableCell title={'Name'} customWidth={'20%'} />
						<TableCell title={'Email'} customWidth={'25%'} />
						<TableCell title={'Phone'} />
						<TableCell title={'Website'} customWidth={'15%'} />
						<TableCell title={'UserName'} customWidth={'10%'} />
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<TableCell title={`${user?.id}`} customWidth={'5%'} />
							<TableCell title={`${user?.name}`} customWidth={'20%'} />
							<TableCell title={`${user?.email}`} customWidth={'25%'} />
							<TableCell title={`${user?.phone}`} />
							<TableCell title={`${user?.website}`} customWidth={'15%'} />
							<TableCell title={`${user?.username}`} customWidth={'10%'} />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
