import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema(
	{
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'product',
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			required: [true, 'please add a user id'],
			ref: 'user',
		},
	},
	{
		timestamps: true,
	},
);
const cart = mongoose.model('cart', cartSchema);
export default cart;
