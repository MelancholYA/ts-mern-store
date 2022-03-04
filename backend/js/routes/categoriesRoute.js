"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const authMiddlware_1 = require("../middlwares/authMiddlware");
const router = (0, express_1.Router)();
router.route('/').get(categoriesController_1.getCategories).post(authMiddlware_1.protectForAdmin, categoriesController_1.setCategories);
router
    .route('/:id')
    .put(authMiddlware_1.protectForAdmin, categoriesController_1.editCategory)
    .delete(authMiddlware_1.protectForAdmin, categoriesController_1.deleteCategory);
exports.default = router;
