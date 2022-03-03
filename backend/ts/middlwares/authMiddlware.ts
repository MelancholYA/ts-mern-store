import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		_id: mongoose.Types.ObjectId;
		name: string;
		email: string;
		orders: mongoose.Types.ObjectId[];
		cart: mongoose.Types.ObjectId;
	}
}

const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const token = req.headers['x-auth-token'];
		const secret: string = process.env.JWT_SECRET || '';
		if (!token) {
			res.status(401);
			throw new Error('not authorized , no token');
		}
		let user: jwt.JwtPayload | string = jwt.verify(token.toString(), secret);

		if (!user) {
			res.status(401);
			throw new Error('not authorized');
		}
		if (typeof user === 'object') {
			req.user = {
				_id: user._id,
				name: user.name,
				email: user.email,
				orders: user.orders,
				cart: user.cart,
			};
		}

		next();
	},
);
const protectForAdmin = asyncHandler(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const token = req.headers['x-auth-token'];
		const secret: string = process.env.JWT_SECRET || '';
		if (!token) {
			res.status(401);
			throw new Error('not authorized , no token');
		}
		let admin = jwt.verify(token.toString(), secret);

		if (!admin) {
			res.status(401);
			throw new Error('not authorized');
		}
		if (admin && typeof admin === 'object') {
			if (!admin.admin) {
				res.status(401);
				throw new Error('not authorized , not admin');
			}
			req.admin = { ...admin, admin: true };
		}

		next();
	},
);

export { protect, protectForAdmin };
