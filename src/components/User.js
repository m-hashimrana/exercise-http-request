import React, { useEffect, useState } from 'react';
import TableCell from './TableCell';

const User = ({ data, setIsOpen, setSelectedUser }) => {
	const handleEdit = (user) => {
		setSelectedUser(user);
		setIsOpen(true);
	};
	return (
		<div>
			<table className='table'>
				<thead className='thead-light'>
					<tr>
						<TableCell title={'ID'} width={'3%'} />
						<TableCell title={'Name'} width={'17%'} />
						<TableCell title={'Email'} width={'15%'} />
						<TableCell title={'Phone'} />
						<TableCell title={'Website'} width={'15%'} />
						<TableCell title={'UserName'} width={'10%'} />
						<TableCell title={''} width={'10%'} />
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<TableCell title={`${user?.id}`} width={'3%'} />
							<TableCell title={`${user?.name}`} width={'17%'} />
							<TableCell title={`${user?.email ?? '_'}`} width={'15%'} />
							<TableCell title={`${user?.phone}`} />
							<TableCell title={`${user?.website ?? '_'}`} width={'15%'} />
							<TableCell title={`${user?.username ?? '_'}`} width={'10%'} />
							<TableCell title={`Edit`} onClick={() => handleEdit(user)} width={'10%'} />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
