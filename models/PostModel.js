import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	body: String,
	username: {
		type: String
	},
	createdAt: Date,
	comments: [
		{
			body: String,
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			createdAt: Date
		}
	],
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
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
