import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema(
	{
		productId: {
			type: String,
			required: [true, 'please add a product id'],
		},
		userId: {
			type: String,
			required: [true, 'please add a user id'],
		},
	},
	{
		timestamps: true,
	},
);
const order = mongoose.model('order', orderSchema);
export default order;
