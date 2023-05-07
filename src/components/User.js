import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableCell from './TableCell';

const User = ({ data, setIsOpen, setSelectedUser }) => {
	const navigate = useNavigate();
	const handleEdit = (user) => {
		setSelectedUser(user);
		setIsOpen(true);
	};
	const handlePath = (user) => {
		navigate(`/post/${user?.id}`);
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
						<TableCell title={''} width={'%'} />
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<TableCell title={`${user?.id}`} width={'3%'} />
							<TableCell title={`${user?.name}`} cursor='pointer' width={'17%'} onClick={() => handlePath(user)} />
							<TableCell title={`${user?.email ?? '_'}`} width={'15%'} />
							<TableCell title={`${user?.phone}`} />
							<TableCell title={`${user?.website ?? '_'}`} width={'15%'} />
							<TableCell title={`${user?.username ?? '_'}`} width={'10%'} />
							<TableCell title={`Edit`} cursor={'pointer'} onClick={() => handleEdit(user)} width={'5%'} />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
