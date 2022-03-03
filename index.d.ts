import mongoose from 'mongoose';
import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: {
				_id: mongoose.Types.ObjectId;
				name: string;
				email: string;
				orders: mongoose.Types.ObjectId[];
				cart: mongoose.Types.ObjectId;
			};
			admin?: {
				_id: mongoose.Types.ObjectId;
				name: string;
				email: string;
				admin: boolean;
			};
		}
	}
}
