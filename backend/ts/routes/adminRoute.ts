import { Router } from 'express';
import {
	addAdmin,
	changeAdminPassword,
	deleteAdmin,
} from '../controllers/adminController';
import { protectForAdmin } from '../middlwares/authMiddlware';

const router = Router();
router.delete('/:id', protectForAdmin, deleteAdmin);
router.route('/new').post(protectForAdmin, addAdmin);
router.route('/changePasword').put(protectForAdmin, changeAdminPassword);

export default router;
