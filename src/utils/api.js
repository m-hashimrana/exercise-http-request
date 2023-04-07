import { userUrl } from './constants/urlConstants';

export const fetchUsers = async (setUsers, setError) => {
	try {
		const response = await fetch(`${userUrl}`);
		if (!response?.ok) {
			throw new Error('Something went wrong!');
		}
		const data = await response.json();
		setUsers(data);
	} catch (error) {
		setError('Something went wrong!');
	}
};

export const handleUserSubmission = async (isEdit, selectedUser, data, setUsers, setSelectedUser, closeModal) => {
	try {
		if (isEdit) {
			let updatedUser = [
				{
					...selectedUser,
				},
			];
			console.log(userUrl);
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

			const toBeUpdated = data?.find((user) => user.id === selectedUser?.id);
			const userIndex = data?.findIndex((user) => user.id === selectedUser.id);
			if (toBeUpdated) {
				setSelectedUser({
					...selectedUser,
				});
			}
			let updatedUserAtIndex = [...data];
			updatedUserAtIndex[userIndex] = selectedUser;
			setUsers(updatedUserAtIndex);
			closeModal();
		} else {
			const user_id = data[data.length - 1].id + 1;
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
			closeModal();
			setUsers([...data, { ...selectedUser, id: user_id }]);
		}
	} catch (error) {
		console.error(error);
	}
};
