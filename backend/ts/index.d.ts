import mongoose from 'mongoose';
import { Request } from 'express';

declare namespace Express {
	interface Request {
		user?: {
			name: string;
			email: string;
			orders: mongoose.Types.ObjectId[];
			cart: mongoose.Types.ObjectId;
		};
	}
}
