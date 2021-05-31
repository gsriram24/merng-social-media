import { AuthenticationError } from 'apollo-server-errors';
import Post from '../../models/PostModel.js';
import checkAuth from '../../util/auth.js';

const postResolvers = {
	Query: {
		// Get All Posts
		getPosts: async () => {
			try {
				const posts = await Post.find({}).sort({ createdAt: -1 });
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		// Get Post by ID
		getPost: async (_, { postId }) => {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				}
				throw new Error('Post not found');
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Mutation: {
		//Create a post
		createPost: async (_, { body }, context) => {
			const user = checkAuth(context);
			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date()
			});
			const post = await newPost.save();
			return post;
		},

		//Delete a post
		deletePost: async (_, { postId }, context) => {
			const user = checkAuth(context);
			try {
				const post = await Post.findById(postId);
				if (user.username === post.username) {
					await post.delete();
					return 'Post Deleted';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

export default postResolvers;
