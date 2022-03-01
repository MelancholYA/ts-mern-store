import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
	name: {
		type: String,
		required: [true, 'please add a category name'],
	},

	products: [String],
});
const category = mongoose.model('category', categorySchema);
export default category;
