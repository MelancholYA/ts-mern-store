import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const token = req.headers['x-auth-token'];
		const secret: string = process.env.JWT_SECRET || '';
		if (!token) {
			res.status(401);
			throw new Error('not authorized , no token');
		}
		let user = jwt.verify(token.toString(), secret);
		console.log(user);

		if (!user) {
			res.status(401);
			throw new Error('not authorized');
		}
		req.user = user;

		next();
	},
);
// const protectForAdmin = asyncHandler(
// 	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// 		const token = req.headers['x-auth-token'];
// 		const secret: string = process.env.JWT_SECRET || '';
// 		if (!token) {
// 			res.status(401);
// 			throw new Error('not authorized , no token');
// 		}
// 		let user = jwt.verify(token.toString(), secret);

// 		if (!user) {
// 			res.status(401);
// 			throw new Error('not authorized');
// 		}
// 		req.user = user;

// 		next();
// 	},
// );

export default protect;
