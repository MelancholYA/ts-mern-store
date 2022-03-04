import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import user from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateJWT';
import admin from '../models/adminModel';

type Tuser = {
	_id: mongoose.Types.ObjectId;

	name: string;
	email: string;
	password?: string;
	orders: mongoose.Types.ObjectId[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	cart: mongoose.Types.ObjectId;
	token?: string;
} | null;

type Tadmin = {
	name: string;
	email: string;
	admin: boolean;
	password: string;
	id: mongoose.Types.ObjectId;
} | null;

type TaddAdminReq = {
	name: string;
	email: string;
	password: string;
};
type TchangePassReq = {
	email: string;
	currPassword: string;
	newPassword: string;
};
type TdeleteAdminReq = {
	id?: mongoose.Types.ObjectId;
};

const addAdmin = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { name, email, password }: TaddAdminReq = Request.body;
		if (!name || !email || !password) {
			Response.status(400);
			throw new Error('Invalid credentials');
		}
		if (!Request.admin?.admin) {
			Response.status(400);
			throw new Error('Not authorized , not admin');
		}
		let alreadyUser: Tuser = await user.findOne({ email });
		if (alreadyUser) {
			Response.status(400);
			throw new Error(
				'user already have a normal user account , please remove it first',
			);
		}
		let alreadyExists: Tadmin = await admin.findOne({ email });
		if (alreadyExists) {
			Response.status(400);
			throw new Error('Email already exists');
		}
		let salt = await bcrypt.genSalt(7);
		let hashedPassword = await bcrypt.hash(password, salt);
		await admin
			.create({
				name,
				email,
				password: hashedPassword,
				admin: true,
			})
			.then((res: Tadmin) => {
				let token: string | null = generateToken({
					id: res?.id,
					name: res?.name,
					email: res?.email,
					admin: res?.admin,
				});
				if (token) {
					Response.status(201).json({
						token,
					});
				} else {
					Response.status(500);
					throw new Error('admin created with no JWT ');
				}
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);

const changeAdminPassword = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { email, currPassword, newPassword }: TchangePassReq = Request.body;

		let adminData: Tadmin = await admin.findOne({ email });
		console.log({ email, currPassword, newPassword });
		if (!adminData) {
			Response.status(400);
			throw new Error('No admin with this email');
		}
		let isSamePassword: boolean = bcrypt.compareSync(
			currPassword,
			adminData.password,
		);
		if (!isSamePassword) {
			Response.status(400);
			throw new Error('wrong password');
		}
		let salt = await bcrypt.genSalt(7);
		let hashedPassword = await bcrypt.hash(newPassword, salt);
		await admin
			.findOneAndUpdate(
				{ email },
				{
					password: hashedPassword,
				},
			)
			.then((res) => {
				Response.status(204).json();
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);
const deleteAdmin = asyncHandler(
	async (Request: Request, Response: Response): Promise<void> => {
		let { id }: TdeleteAdminReq = Request.params;
		console.log(id);
		await admin
			.findByIdAndDelete(id)
			.then((res) => {
				if (!res) {
					Response.status(400);
					throw new Error('no admin was find with this id');
				}
				console.log({ res });
				Response.status(204).json();
			})
			.catch((err) => {
				Response.status(500);
				throw new Error(err);
			});
	},
);

export { addAdmin, changeAdminPassword, deleteAdmin };
