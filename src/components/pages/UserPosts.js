import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../../utils/services/api';
import { fetchComments } from '../../utils/services/commentsApi';
import { fetchPosts } from '../../utils/services/postApi';
import Comments from '../Comments';
import TableCell from '../TableCell';

const UserPosts = () => {
	const [posts, setPosts] = useState({ selectedUserPost: null, totalPosts: [], postComments: [] });
	const [isShowComments, setIsShowComments] = useState(false);

	const [comparedId, setComparedId] = useState('');
	const { id } = useParams();

	const handleUsersPosts = async () => {
		const response = await fetchPosts();
		const user = await fetchUsers();
		const totalPosts = response?.filter((userPost) => userPost?.userId == id);
		const selectedUserPost = user?.filter((user) => user?.id == id);
		setPosts({ ...posts, selectedUserPost, totalPosts });
	};
	const userName = posts?.selectedUserPost?.find((post) => post?.id == id);
	useEffect(() => {
		handleUsersPosts();
	}, [id]);
	const handleComments = async (postId) => {
		setIsShowComments(!isShowComments);
		const comments = await fetchComments();
		const postComments = comments?.filter((comment) => comment?.postId == postId);
		setComparedId(postId);

		setPosts({ ...posts, postComments });
	};
	return (
		<>
			<h3>{userName?.name} has following posts</h3>
			{posts?.totalPosts.map((post) => (
				<>
					<div className='post' key={post?.user?.totalPosts?.id}>
						<h1>{post?.title}</h1>
						<p>{post?.body}</p>
						<span onClick={() => handleComments(post?.id)}>
							{isShowComments && post?.id == comparedId ? ' hide comments' : 'see comments'}
						</span>
					</div>
					{isShowComments && post?.id == comparedId ? <Comments posts={posts} /> : null}
				</>
			))}
		</>
	);
};

export default UserPosts;
