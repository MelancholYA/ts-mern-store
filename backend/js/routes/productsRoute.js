"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const authMiddlware_1 = require("../middlwares/authMiddlware");
const router = (0, express_1.Router)();
router.route('/').get(productsController_1.getproducts).post(authMiddlware_1.protectForAdmin, productsController_1.setProducts);
router
    .route('/:id')
    .get(productsController_1.getproduct)
    .put(authMiddlware_1.protectForAdmin, productsController_1.editProducts)
    .delete(authMiddlware_1.protectForAdmin, productsController_1.deleteProduct);
exports.default = router;
