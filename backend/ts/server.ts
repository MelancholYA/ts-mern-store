import express from 'express';
const errorHandler = require('./middlwares/errorHandler');
import router from './routes/categoriesRoute';

const app = express();
const dotenv = require('dotenv').config();
const port = process.env.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/categories', router);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
