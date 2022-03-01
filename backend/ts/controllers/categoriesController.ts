import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const getCategories = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('cat list');
	},
);
export const setCategories = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		if (!Request.body.category) {
			Response.status(400);
			throw new Error('no category was provided');
		}
		Response.send('add to cat list');
	},
);
export const editCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('edit cat list id = ' + Request.params.id);
	},
);
export const deleteCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('delete cat list item of id ' + Request.params.id);
	},
);
