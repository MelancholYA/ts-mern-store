import { Router } from 'express';
import {
	registerUser,
	loginUser,
	updateUser,
	changeUserPassword,
	deleteUser,
} from '../controllers/userController';
import { protect, protectForAdmin } from '../middlwares/authMiddlware';

const router = Router();

router.post('/new', registerUser);
router.put('/update', protect, updateUser);
router.post('/login', loginUser);
router.post('/changePassword', changeUserPassword);
router.delete('/:id', protectForAdmin, deleteUser);

export default router;
