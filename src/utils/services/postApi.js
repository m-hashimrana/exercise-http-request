import { toast } from 'react-toastify';
import axios from 'axios';
import { postUrl } from '../constants/urlConstants';

export const fetchPosts = async () => {
	try {
		const response = await axios.get(`${postUrl}`);
		if (!response?.ok) {
		}
		return response?.data;
	} catch (error) {
		toast.error('Something went wrong', { toastId: '' });
	}
};
