import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import user from '../models/userModel';
import cart from '../models/cartModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateJWT';

type Tuser = {
	_id: mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	orders: mongoose.Types.ObjectId[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	cart: mongoose.Types.ObjectId;
	token?: string;
} | null;

type Tcart = {
	_id: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	products: mongoose.Types.ObjectId[];
};

const registerUser = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { name, email, password } = Request.body;
		if (!name || !email || !password) {
			Response.status(400);
			throw new Error('Invalid credentials');
		}
		let userData: Tuser = await user.findOne({ email });
		if (userData) {
			Response.status(400);
			throw new Error('Email already exists');
		}
		let salt = await bcrypt.genSalt(7);
		let hashedPassword = await bcrypt.hash(password, salt);
		await user
			.create({ name, email, password: hashedPassword })
			.then(async (res) => {
				let cartItem: Tcart = await cart.create({
					products: [],
					user: res._id,
				});
				let userItem: Tuser = await user
					.findByIdAndUpdate(
						res._id,
						{
							cart: cartItem._id,
						},
						{ new: true },
					)
					.select('-password -__v -createdAt -updatedAt');

				let token: string | null = generateToken(userItem);
				if (token) {
					Response.status(201).json({
						token,
					});
				} else {
					res.status(500);
					throw new Error('user created with no JWT');
				}
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);
const loginUser = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		const { email, password } = Request.body;
		if (!email || !password) {
			Response.status(400);
			throw new Error('invalid credianltials');
		}
		let userData: Tuser = await user
			.findOne({ email })
			.select('-password -__v -createdAt -updatedAt');
		if (!userData) {
			Response.status(400);
			throw new Error('no user was found with this email');
		}
		let token = generateToken(userData);
		if (!token) {
			Response.status(500);
			throw new Error("couldn't generate token");
		}

		Response.status(200).json({ token });
	},
);

const updateUser = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		const newData = Request.body;
		if (newData.password) {
			delete newData.password;
		}
		await user
			.findByIdAndUpdate(Request?.user._id, newData, { new: true })
			.then((res) => {
				Response.status(204).json();
			})
			.catch((err) => {
				Response.status(400);
				throw new Error(err);
			});
	},
);

export { registerUser, loginUser, updateUser };
