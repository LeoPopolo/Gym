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
exports.users = exports.profile = exports.signin = exports.signup = void 0;
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.User();
        user.password = yield user.encryptPassword(req.body.password);
        user.username = req.body.username;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;
        user.address = req.body.address;
        const rows = yield database_1.default.query('INSERT INTO users SET ?', [user])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== undefined && rows !== null) {
            // generating token
            const token = jsonwebtoken_1.default.sign({
                _id: user.username
            }, process.env.TOKEN_SECRET);
            res.status(200).json({
                status: 'OK',
                token: token
            });
        }
    });
}
exports.signup = signup;
;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_1.User();
        const rows = yield database_1.default.query('SELECT * FROM users WHERE username = ?', [req.body.username])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0 || rows === null || rows === undefined) {
            return res.status(400).json({
                error: 'username or password incorrect'
            });
        }
        else {
            user.id = rows[0].id;
            user.password = rows[0].password;
            user.username = rows[0].username;
            user.email = rows[0].email;
            user.phone_number = rows[0].phone_number;
            user.address = rows[0].address;
            const correctPassword = yield user.validatePassword(req.body.password);
            if (!correctPassword) {
                return res.status(400).json({
                    error: 'invalid password'
                });
            }
            const token = jsonwebtoken_1.default.sign({
                _id: user.id
            }, process.env.TOKEN_SECRET);
            res.header('Authorization', token).json({
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone_number: user.phone_number,
                    address: user.address
                }
            });
        }
    });
}
exports.signin = signin;
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_1.User();
        const rows = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [req.userId])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0 || rows === null || rows === undefined) {
            return res.status(404).json({
                error: 'user not found'
            });
        }
        else {
            user.id = rows[0].id;
            user.password = rows[0].password;
            user.username = rows[0].username;
            user.email = rows[0].email;
            user.phone_number = rows[0].phone_number;
            user.address = rows[0].address;
            res.status(200).json({
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    phone_number: user.phone_number,
                    address: user.address
                }
            });
        }
    });
}
exports.profile = profile;
function users(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var usersArray = [];
        const rows = yield database_1.default.query(`SELECT *
                                    FROM users
                                    WHERE 1=1`)
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0) {
            return res.status(404).json({
                error: 'No data found'
            });
        }
        else {
            for (let i = 0; i < rows.length; i++) {
                usersArray[i] = {
                    "id": rows[i].id,
                    "username": rows[i].username,
                    "email": rows[i].email,
                    "phone_number": rows[i].phone_number,
                    "address": rows[i].address
                };
            }
            res.status(200).json({
                data: usersArray
            });
        }
    });
}
exports.users = users;
//# sourceMappingURL=auth.controller.js.map