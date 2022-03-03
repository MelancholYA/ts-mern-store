import { Router } from 'express';
import {
	registerUser,
	loginUser,
	updateUser,
	addAdmin,
	changeUserPassword,
} from '../controllers/userController';
import { protect, protectForAdmin } from '../middlwares/authMiddlware';

const router = Router();

router.route('/new').post(registerUser);
router.route('/update').put(protect, updateUser);
router.route('/newAdmin').post(protectForAdmin, addAdmin);
router.route('/login').post(loginUser);
router.route('/changePassword').post(changeUserPassword);

export default router;
