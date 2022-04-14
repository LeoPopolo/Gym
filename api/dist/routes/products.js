"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
const product_controller_1 = require("../controllers/product.controller");
router.get('/', verifyToken_1.tokenValidation, product_controller_1.getProducts);
router.post('/', verifyToken_1.tokenValidation, product_controller_1.addProduct);
exports.default = router;
//# sourceMappingURL=products.js.map