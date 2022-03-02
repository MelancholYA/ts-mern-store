import mongoose from 'mongoose';
import cart from './cartModel';
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
			unique: true,
		},
		picture: String,
		address: String,
		admin: Boolean,
		password: {
			type: String,
			required: [true, 'password is required'],
		},
		cart: {
			type: mongoose.Types.ObjectId,
			ref: 'cart',
		},
		orders: [String],
	},
	{
		timestamps: true,
	},
);
const user = mongoose.model('user', userSchema);
export default user;
