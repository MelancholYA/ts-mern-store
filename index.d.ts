import mongoose from 'mongoose';
import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}
