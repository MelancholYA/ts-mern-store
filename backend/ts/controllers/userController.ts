import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import user from '../models/userModel';
import cart from '../models/cartModel';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { name, email, password } = Request.body;
		if (!name || !email || !password) {
			Response.status(400);
			throw new Error('Invalid credentials');
		}
		let userData = await user.findOne({ email });
		if (userData) {
			Response.status(400);
			throw new Error('Email already exists');
		}
		let salt = await bcrypt.genSalt(7);
		let hashedPassword = await bcrypt.hash(password, salt);
		await user
			.create({ name, email, password: hashedPassword })
			.then(async (res) => {
				let cartItem = await cart.create({
					products: [],
					user: res._id,
				});
				let userItem = await user
					.findByIdAndUpdate(
						res._id,
						{
							cart: cartItem._id,
						},
						{ returnDocument: 'after' },
					)
					.select('-password');
				Response.status(201).json(userItem);
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);
const loginUser = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.status(200).send('logeed in');
	},
);
const getUser = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		Response.status(200).send('user data');
	},
);

export { registerUser, loginUser, getUser };
