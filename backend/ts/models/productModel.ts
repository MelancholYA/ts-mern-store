import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'please add a name'],
		},
		count: {
			type: Number,
			required: [true, 'please add a count'],
		},
		curentPrice: {
			type: Number,
			required: [true, 'please add a price'],
		},
		olderPrice: Number,
		description: {
			type: String,
			required: [true, 'please add a description'],
		},
		images: {
			default: {
				type: String,
				required: [true, 'please add a product image'],
			},
			thumbs: [String],
		},
		categories: {
			type: String,
			required: [true, 'please add at least one category'],
		},
	},
	{
		timestamps: true,
	},
);
const product = mongoose.model('product', productSchema);
export default product;
