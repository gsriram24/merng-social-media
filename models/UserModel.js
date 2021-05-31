import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	createdAt: Date
});

const User = mongoose.model('User', userSchema);
export default User;
