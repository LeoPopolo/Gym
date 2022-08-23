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
exports.signin = exports.signup = void 0;
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.User();
        const tmp_pass = yield user.encryptPassword(req.body.password);
        if (tmp_pass) {
            user.password = tmp_pass;
        }
        user.dni = req.body.dni;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.password = tmp_pass;
        console.log(user);
        yield database_1.default.query(`SELECT authentication.user('${user.dni}','${user.name}','${user.surname}','${user.email}','${user.password}')`)
            .then(resp => {
            console.log(resp);
            if (resp.rows) {
                // generating token
                const token = jsonwebtoken_1.default.sign({
                    _id: user.dni
                }, process.env.TOKEN_SECRET);
                res.status(200).json({
                    status: 'OK',
                    token: token
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
    });
}
exports.signup = signup;
;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.User();
        yield database_1.default.query(`SELECT webapi.authentication_user_login('${req.body.email}')`)
            .then((resp) => __awaiter(this, void 0, void 0, function* () {
            if (resp.rows) {
                user.password = resp.rows[0].authentication_user_login.password;
                user.id = resp.rows[0].authentication_user_login.id;
                const correctPassword = yield user.validatePassword(req.body.password);
                if (!correctPassword) {
                    return res.status(400).json({
                        error: 'invalid password'
                    });
                }
                const token = jsonwebtoken_1.default.sign({
                    _id: resp.rows[0].authentication_user_login.id
                }, process.env.TOKEN_SECRET);
                res.header('Authorization', token).json({
                    data: {
                        status: "ok",
                        id: user.id
                    }
                });
            }
        })).catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
    });
}
exports.signin = signin;
// export async function profile(req: Request, res: Response) {
//     let user = new User();
//     await conn.query('SELECT * FROM users WHERE id = ?', [req.userId]) 
//     .catch(err => {
//         return res.status(400).send(err);
//     })
//     .then(resp => {
//         if((resp as any).rows.length === 0 || (resp as any).rows === null || (resp as any).rows === undefined) {
//             return res.status(404).json({
//                 error: 'user not found'
//             });
//         } else {
//             user.id = (resp as any).rows[0].id;
//             user.password = (resp as any).rows[0].password;
//             user.username = (resp as any).rows[0].username;
//             user.email = (resp as any).rows[0].email;
//             user.phone_number = (resp as any).rows[0].phone_number;
//             user.address = (resp as any).rows[0].address;
//             res.status(200).json({
//                 data: {
//                     id: user.id,
//                     email: user.email,
//                     username: user.username,
//                     phone_number: user.phone_number,
//                     address: user.address
//                 }
//             }); 
//         }
//     });    
// }
// export async function users(req: Request, res: Response) {
//     var usersArray = [];
//     await conn.query(`SELECT *
//                         FROM authentication.user
//                         WHERE 1=1`)
//     .catch(err => {
//         return res.status(400).send(err);
//     })
//     .then(resp => {
//         if((resp as any).rows.length === 0) {
//             return res.status(404).json({
//                 error: 'No data found'
//             });
//         } else {
//             usersArray = (resp as any).rows;
//             res.status(200).json({
//                 data: usersArray
//             }); 
//         }
//     });
// }
//# sourceMappingURL=auth.controller.js.map