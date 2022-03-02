import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
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

const setProducts = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		await product
			.create(Request.body)
			.then((res: Iproduct) => Response.json(res))
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
		let id: string = Request.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			Response.status(400);
			throw new Error('invalid product id');
		}
		await product
			.findByIdAndDelete(id)
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

export { getproducts, setProducts, editProducts, deleteProduct, getproduct };
