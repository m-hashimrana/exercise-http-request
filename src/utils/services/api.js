import { userUrl } from '../constants/urlConstants';
import { toast } from 'react-toastify';

export const fetchUsers = async (setUsers, setError) => {
	const response = await fetch(`${userUrl}`);
	if (!response?.ok) {
		setError('something went wrong');
		toast.error('something went wrong', { toastId: '' });
	}
	const data = await response.json();
	setUsers(data);
};

export const updateUser = async (selectedUser) => {
	let updatedUser = [{ ...selectedUser }];
	const response = await fetch(`${userUrl}/${selectedUser.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedUser),
	});
	!response.ok ? toast.error('Failed to update user!') : toast('Updated User Sucessfully');
};

export const createUser = async (selectedUser) => {
	const response = await fetch(`${userUrl}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(selectedUser),
	});
	!response.ok ? toast.error('Failed to create user!') : toast('Created User Sucessfully');
};
