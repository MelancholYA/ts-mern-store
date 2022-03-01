import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
	name: String,
	products: [],
});
const category = mongoose.model('category', categorySchema);
export default category;
