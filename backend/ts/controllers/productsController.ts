import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import product from '../models/productModel';

const getproduct = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		await product
			.findById(Request.body.id)

			.then((res) => {
				if (!res) {
					Response.status(400);
					throw new Error('no item was found');
				} else {
					Response.status(400).json(res);
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
		Response.send('products');
	},
);

const setProducts = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('add product');
	},
);

const editProducts = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('proucts edit ');
	},
);

const deleteProduct = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.send('delete product list item of id ' + Request.params.id);
	},
);

export { getproducts, setProducts, editProducts, deleteProduct, getproduct };
