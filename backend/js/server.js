"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlwares/errorHandler"));
const categoriesRoute_1 = __importDefault(require("./routes/categoriesRoute"));
const productsRoute_1 = __importDefault(require("./routes/productsRoute"));
const db_1 = __importDefault(require("./config/db"));
const config_1 = __importDefault(require("dotenv/config"));
config_1.default;
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.port || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/categories', categoriesRoute_1.default);
app.use('/api/products', productsRoute_1.default);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
