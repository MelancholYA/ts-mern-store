import { Router } from 'express';
import {
	getproducts,
	setProducts,
	editProducts,
	deleteProduct,
	getproduct,
} from '../controllers/productsController';

const router = Router();

router.route('/').get(getproducts).post(setProducts);
router.route('/:id').get(getproduct).put(editProducts).delete(deleteProduct);

export default router;
