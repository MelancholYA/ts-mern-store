import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import category from '../models/categoryModel';
import product from '../models/productModel';

type Ierror = {
	name: string;
	message: string;
	properties: {
		message: string;
		type: string;
		path: string;
	};
	kind: string;
	path: string;
};
type Iproduct = {
	_id?: mongoose.Types.ObjectId;
	description: string;
	curentPrice: number;
	olderPrce?: number;
	count: number;
	name: string;
	images: { default: string; thumbs?: string[] };
	categories: string;
};

const getproduct = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		var id: string = Request.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			Response.status(400);
			throw new Error('invalid product id');
		}
		await product
			.findById(id)
			.then((res: Iproduct | null) => {
				if (!res) {
					Response.status(400).json({
						message: 'no item was found',
						status: 400,
					});
				} else {
					Response.status(200).json(res);
				}
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);
const getproducts = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		await product
			.find()
			.then((res: Iproduct[]) => Response.status(200).json(res))
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);
const getProductByCategory = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { id } = Request.params;
		await product
			.find({ categories: [id] })
			.then((res: Iproduct[]) => Response.status(200).json(res))
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);

const setProducts = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		await product
			.create(Request.body)
			.then(async (res: Iproduct) => {
				let updated = await category.find({ _id: Request.body.categories });
				console.log({ updated });
				updated.map(async (cat: any) => {
					cat.products.push(res._id);
					await cat.save();
				});
				Response.json(updated);
			})
			.catch((err) => {
				let messages: string[] = [];
				let errors: Ierror[] = Object.values(err.errors);
				errors.map((value) => messages.push(value.message));
				Response.status(400);
				throw new Error(messages[0]);
			});
	},
);

const editProducts = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let id: string = Request.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			Response.status(400);
			throw new Error('invalid product id');
		}
		await product
			.findByIdAndUpdate(id, Request.body, { new: true })
			.then((res: Iproduct | null) => {
				if (!res) {
					Response.status(400).json({
						message: 'no item was found',
						status: 400,
					});
				} else {
					Response.status(200).json(res);
				}
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);

const deleteProduct = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { id } = Request.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			Response.status(400);
			throw new Error('invalid product id');
		}
		await product
			.findByIdAndDelete(id)
			.then(async (res: Iproduct | null) => {
				if (!res) {
					Response.status(400).json({
						message: 'no item was found',
						status: 400,
					});
				} else {
					let updated = await category.find({ _id: Request.body.categories });
					console.log({ updated });
					updated.map(async (cat: any) => {
						cat.products = cat.product.filter(
							(prod: mongoose.Types.ObjectId) => prod === res._id,
						);
						await cat.save();
					});
					Response.status(200).json(res);
				}
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
		let relatedCategories = await category.find({ products: [id] });
		relatedCategories.map(async (cat, i) => {
			cat.products = cat.products.filter((product: any) => product === id);
			await cat.save();
		});
	},
);

export {
	getproducts,
	setProducts,
	getProductByCategory,
	editProducts,
	deleteProduct,
	getproduct,
};
