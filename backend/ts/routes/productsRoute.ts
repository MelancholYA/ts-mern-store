import { Router } from 'express';
import {
	getproducts,
	setProducts,
	editProducts,
	deleteProduct,
	getproduct,
} from '../controllers/productsController';
import { protectForAdmin } from '../middlwares/authMiddlware';

const router = Router();

router.route('/').get(getproducts).post(protectForAdmin, setProducts);
router
	.route('/:id')
	.get(getproduct)
	.put(protectForAdmin, editProducts)
	.delete(protectForAdmin, deleteProduct);

export default router;
