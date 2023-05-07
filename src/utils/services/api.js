import { userUrl } from '../constants/urlConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchUsers = async () => {
	try {
		const response = await axios.get(`${userUrl}`);
		if (!response?.ok) {
		}
		return response?.data;
	} catch (error) {
		toast.error('Something went wrong', { toastId: '' });
	}
};

export const updateUser = async (selectedUser) => {
	let updatedUser = [{ ...selectedUser }];
	await axios.put(`${userUrl}/${selectedUser.id}`, updatedUser);
};

export const createUser = async (selectedUser) => {
	await axios.post(userUrl, selectedUser, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
