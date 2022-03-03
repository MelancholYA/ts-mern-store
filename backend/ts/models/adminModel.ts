import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
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
		admin: Boolean,
		password: {
			type: String,
			required: [true, 'password is required'],
		},
	},
	{
		timestamps: true,
	},
);
const admin = mongoose.model('admin', adminSchema);
export default admin;
