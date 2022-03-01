import { Request, NextFunction, Response } from 'express';

type Ierror = {
	message: string;
	stack?: string | null;
	status: number;
};

const errorHandler = (
	err: TypeError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const resStatus: number = res.statusCode ? res.statusCode : 500;
	const errorBody: Ierror = {
		message: err.message.replace('Error: ', ''),
		stack: process.env.NODE_ENV === 'development' ? err.stack : null,
		status: resStatus,
	};
	console.log(errorBody.message);

	res.status(resStatus).send(errorBody);
};

export default errorHandler;
