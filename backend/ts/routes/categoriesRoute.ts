import { Router } from 'express';
import {
	deleteCategory,
	editCategory,
	getCategories,
	setCategories,
} from '../controllers/categoriesController';

const router = Router();

router.route('/').get(getCategories).post(setCategories);
router.route('/:id').put(editCategory).delete(deleteCategory);

export default router;
