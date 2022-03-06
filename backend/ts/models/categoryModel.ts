import mongoose from 'mongoose';
import product from './productModel';

const categorySchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please add a category name'],
	},
	products: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'product',
		},
	],
});
const category = mongoose.model('category', categorySchema);

export default category;
