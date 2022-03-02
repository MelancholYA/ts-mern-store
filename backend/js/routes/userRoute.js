"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.route('/new').post(userController_1.registerUser);
router.route('/me').get(userController_1.getUser);
router.route('/login').post(userController_1.loginUser);
exports.default = router;
