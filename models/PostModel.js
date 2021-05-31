import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	body: String,
	username: String,
	createdAt: Date,
	comments: [
		{
			body: String,
			username: {
				type: String
			},
			createdAt: Date
		}
	],
	likes: [
		{
			username: {
				type: String
			},
			createdAt: Date
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Post = mongoose.model('Post', postSchema);
export default Post;
