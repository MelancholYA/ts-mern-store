import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'user name is required'],
		},
		email: {
			type: String,
			required: [true, 'email is required'],
		},
		picture: String,
		address: String,
		password: {
			type: String,
			required: [true, 'password is required'],
		},
		cart: String,
		orders: [String],
	},
	{
		timestamps: true,
	},
);
const user = mongoose.model('user', userSchema);
export default user;
