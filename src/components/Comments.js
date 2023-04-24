import React from 'react';
import TableCell from './TableCell';

const Comments = ({ posts }) => {
	return (
		<div>
			<table className='table'>
				<thead className='thead-light'>
					<tr>
						<TableCell title={'Email'} width={'30%'} />
						<TableCell title={'Comment'} width={'70%'} textAlign='left' />
					</tr>
				</thead>
				<tbody>
					{posts?.postComments?.map((comment) => (
						<tr key={comment?.id}>
							<TableCell title={comment?.email?.toLowerCase()} width={'30%'} />
							<TableCell title={comment?.body} width={'70%'} textAlign='left' />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Comments;
