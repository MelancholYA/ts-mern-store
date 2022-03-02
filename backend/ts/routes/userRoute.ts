import { Router } from 'express';
import {
	registerUser,
	loginUser,
	getUser,
} from '../controllers/userController';

const router = Router();

router.route('/new').post(registerUser);
router.route('/me').get(getUser);
router.route('/login').post(loginUser);

export default router;
