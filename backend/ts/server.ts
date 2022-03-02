import express from 'express';
import errorHandler from './middlwares/errorHandler';
import categoriesRouter from './routes/categoriesRoute';
import productsRouter from './routes/productsRoute';
import connectDB from './config/db';
import dotenv from 'dotenv/config';

dotenv;
connectDB();

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
