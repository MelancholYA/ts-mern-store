import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema(
	{
		products: [String],
		userId: {
			type: String,
			required: [true, 'please add a user id'],
		},
	},
	{
		timestamps: true,
	},
);
const cart = mongoose.model('cart', cartSchema);
export default cart;
