"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler = require('./middlwares/errorHandler');
const categoriesRoute_1 = __importDefault(require("./routes/categoriesRoute"));
const app = (0, express_1.default)();
const dotenv = require('dotenv').config();
const port = process.env.port || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/categories', categoriesRoute_1.default);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
