import mongoose from 'mongoose';

declare global {
	namespace Express {
		interface Request {
			user?: {
				name: string;
				email: string;
				orders: mongoose.Types.ObjectId[];
				cart: mongoose.Types.ObjectId;
			};
		}
	}
	interface JwtPayload {
		user: {
			name: string;
			email: string;
			orders: mongoose.Types.ObjectId[];
			cart: mongoose.Types.ObjectId;
		};
	}
}
