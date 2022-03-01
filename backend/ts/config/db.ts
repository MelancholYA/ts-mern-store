import mongoose from 'mongoose';

const connectDB = async () => {
	let uri = process.env.MONGO_URI || '';

	try {
		const conn = await mongoose.connect(uri);

		console.log(`DB connected to host : ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
