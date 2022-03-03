import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '';

const generateToken = (payload: any) => {
	return payload
		? jwt.sign(JSON.parse(JSON.stringify(payload)), secret, {
				expiresIn: '30d',
		  })
		: null;
};

export default generateToken;
