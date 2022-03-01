"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const router = (0, express_1.Router)();
router.route('/').get(categoriesController_1.getCategories).post(categoriesController_1.setCategories);
router.route('/:id').put(categoriesController_1.editCategory).delete(categoriesController_1.deleteCategory);
exports.default = router;
