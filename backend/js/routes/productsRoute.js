"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const router = (0, express_1.Router)();
router.route('/').get(productsController_1.getproducts).post(productsController_1.setProducts);
router.route('/:id').get(productsController_1.getproduct).put(productsController_1.editProducts).delete(productsController_1.deleteProduct);
exports.default = router;
