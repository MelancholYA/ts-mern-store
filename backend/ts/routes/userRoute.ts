import { Router } from 'express';
import {
	registerUser,
	loginUser,
	updateUser,
} from '../controllers/userController';
import protect from '../middlwares/authMiddlware';

const router = Router();

router.route('/new').post(registerUser);
router.route('/update').put(protect, updateUser);
router.route('/login').post(loginUser);

export default router;
