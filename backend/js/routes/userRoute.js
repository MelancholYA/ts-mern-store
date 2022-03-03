"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddlware_1 = __importDefault(require("../middlwares/authMiddlware"));
const router = (0, express_1.Router)();
router.route('/new').post(userController_1.registerUser);
router.route('/update').put(authMiddlware_1.default, userController_1.updateUser);
router.route('/login').post(userController_1.loginUser);
exports.default = router;
