import Post from '../../models/PostModel.js';

const postResolvers = {
	Query: {
		getPosts: async () => {
			try {
				const posts = await Post.find({});
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		}
	}
};

export default postResolvers;
