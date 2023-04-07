export const handleUserSubmission = async (isEdit, selectUser, data, setUsers, setSelectUser, closeModal) => {
	try {
		if (isEdit) {
			let updatedUser = [
				{
					...selectUser,
				},
			];
			const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser),
			});
			if (!response.ok) {
				throw new Error('Failed to update user!');
			}

			const toBeUpdated = data?.find((user) => user.id === selectUser?.id);
			const userIndex = data?.findIndex((user) => user.id === selectUser.id);
			if (toBeUpdated) {
				setSelectUser({
					...selectUser,
				});
			}
			let updatedUserAtIndex = [...data];
			updatedUserAtIndex[userIndex] = selectUser;
			setUsers(updatedUserAtIndex);
			closeModal();
		} else {
			const user_id = data[data.length - 1].id + 1;
			const response = await fetch('https://jsonplaceholder.typicode.com/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(selectUser),
			});

			if (!response.ok) {
				throw new Error('Failed to create user!');
			}
			closeModal();
			setUsers([...data, { ...selectUser, id: user_id }]);
		}
	} catch (error) {
		console.error(error);
	}
};
