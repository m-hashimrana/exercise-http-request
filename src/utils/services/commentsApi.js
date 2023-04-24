import { toast } from 'react-toastify';
import axios from 'axios';
import { commentsUrl } from '../constants/urlConstants';

export const fetchComments = async () => {
	try {
		const response = await axios.get(`${commentsUrl}`);
		return response?.data;
	} catch (error) {
		toast.error('Something went wrong', { toastId: '' });
	}
};
