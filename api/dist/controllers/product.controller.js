"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.getProducts = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let productResponse = [];
        const rows = yield database_1.default.query(`SELECT *
                                    FROM products
                                    WHERE 1 = 1`)
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined && rows.length !== 0) {
            productResponse = rows;
            for (let product of productResponse) {
                if (product.deleted === 1) {
                    product.deleted = true;
                }
                else {
                    product.deleted = false;
                }
            }
            res.status(200).json({
                data: productResponse
            });
        }
        else {
            return res.status(404).json({
                error: 'user not found'
            });
        }
    });
}
exports.getProducts = getProducts;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let productResponse = [];
        const rows = yield database_1.default.query(`INSERT INTO products
                                    SET ?`, [req.body])
            .catch(err => {
            return res.status(400).send(err);
        });
        productResponse = req.body;
        res.status(200).json({
            data: productResponse,
            status: "OK",
            message: "Product added"
        });
    });
}
exports.addProduct = addProduct;
//# sourceMappingURL=product.controller.js.map