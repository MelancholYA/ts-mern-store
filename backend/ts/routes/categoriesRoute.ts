import { Router } from 'express';
import {
	deleteCategory,
	editCategory,
	getCategories,
	setCategories,
} from '../controllers/categoriesController';
import { protectForAdmin } from '../middlwares/authMiddlware';

const router = Router();

router.route('/').get(getCategories).post(protectForAdmin, setCategories);
router
	.route('/:id')
	.put(protectForAdmin, editCategory)
	.delete(protectForAdmin, deleteCategory);

export default router;
