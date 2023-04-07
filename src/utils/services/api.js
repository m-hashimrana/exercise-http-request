import { userUrl } from '../constants/urlConstants';
import { handleUpdateLogic } from './updateLogic';

export const fetchUsers = async (setUsers, setError) => {
	const response = await fetch(`${userUrl}`);
	if (!response?.ok) {
		throw new Error('Something went wrong!');
	}
	const data = await response.json();
	setUsers(data);
};

export const handleUserSubmission = async (selectedUser) => {
	if (selectedUser?.id) {
		let updatedUser = [
			{
				...selectedUser,
			},
		];
		const response = await fetch(`${userUrl}/${selectedUser.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedUser),
		});
		if (!response.ok) {
			throw new Error('Failed to update user!');
		}
	} else {
		const response = await fetch(`${userUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(selectedUser),
		});

		if (!response.ok) {
			throw new Error('Failed to create user!');
		}
	}
};
