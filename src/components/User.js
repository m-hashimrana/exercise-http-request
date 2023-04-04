import React, { useState } from 'react';

const User = ({ data }) => {
	return (
		<div>
			<table className='table'>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Email</th>
						<th scope='col'>Phone</th>
						<th scope='col'>website</th>
						<th scope='col'>UserName</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<th scope='row'>{user?.id}</th>
							<td>{user?.name}</td>
							<td>{user?.userName}</td>
							<td>{user?.email}</td>
							<td>{user?.phone}</td>
							<td>{user?.website}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
