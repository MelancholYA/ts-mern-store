import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import category from '../models/categoryModel';

const getCategories = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		const categories = await category.find();
		Response.send(categories);
	},
);

const setCategories = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		if (!Request.body.category) {
			Response.status(400);
			throw new Error('no category was provided');
		}
		Response.send('add to cat list');
	},
);

const editCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('edit cat list id = ' + Request.params.id);
	},
);

const deleteCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('delete cat list item of id ' + Request.params.id);
	},
);

export { getCategories, setCategories, editCategory, deleteCategory };
