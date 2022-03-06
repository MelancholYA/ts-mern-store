import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import category from '../models/categoryModel';
import product from '../models/productModel';

const getCategories = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		const categories = await category.find();
		Response.status(200).json(categories);
	},
);

const setCategories = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { name, products } = Request.body;
		if (!name) {
			Response.status(400);
			throw new Error('Please provide a name for your category');
		}
		await category
			.create({
				name,
				products,
			})
			.then((res) => Response.status(204).json())
			.catch((err) => {
				Response.status(400);
				throw new Error(err);
			});
	},
);

const editCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { id } = Request.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			Response.status(400);
			throw new Error('Please provide a valid category id');
		}
		if (JSON.stringify(Request.body) === '{}') {
			Response.status(400);
			throw new Error('Please provide a valid body');
		}
		await category
			.findByIdAndUpdate(id, Request.body)
			.then((res) => Response.status(204).json(res))
			.catch((err) => {
				Response.status(400);
				throw new Error(err);
			});
	},
);

const deleteCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { id } = Request.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			Response.status(400);
			throw new Error('Please provide a valid category id');
		}
		try {
			await category.findOneAndRemove({ _id: id });
			let relatedProducts = await product.find({ category: id });
			relatedProducts.map(async (product, i) => {
				product.categories = product.categories.filter(
					(category: any) => category === id,
				);
				await product.save();
			});
			Response.status(204).json();
		} catch (error: any) {
			Response.status(400);
			throw new Error(error);
		}
	},
);

export { getCategories, setCategories, editCategory, deleteCategory };
