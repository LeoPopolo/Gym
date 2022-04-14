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
exports.setPassword = exports.setBirthdate = exports.setEmail = exports.setPhoneNumber = exports.setUsername = exports.setSurname = exports.setName = exports.addInscription = exports.userInscriptions = exports.getSubjects = exports.identifyById = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
dotenv_1.default.config();
function identifyById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userResponse = {
            id: null,
            name: null,
            surname: null,
            username: null,
            email: null,
            birthdate: null,
            phone_number: null
        };
        const rows = yield database_1.default.query(`SELECT u.id, u.username, u.email, u.birthdate, u.name, u.surname, u.phone_number
                FROM user u
                WHERE u.id = ?`, [req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined && rows.length !== 0) {
            userResponse = {
                "id": rows[0].id,
                "name": rows[0].name,
                "surname": rows[0].surname,
                "username": rows[0].username,
                "email": rows[0].email,
                "birthdate": rows[0].birthdate,
                "phone_number": rows[0].phone_number,
            };
            res.status(200).json({
                data: userResponse
            });
        }
        else {
            return res.status(404).json({
                error: 'user not found'
            });
        }
    });
}
exports.identifyById = identifyById;
function getSubjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`SELECT *
                FROM subject;`)
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined && rows.length !== 0) {
            let subjectResponse = rows;
            res.status(200).json({
                data: subjectResponse
            });
        }
        else {
            return res.status(404).json({
                error: 'data not found'
            });
        }
    });
}
exports.getSubjects = getSubjects;
;
function userInscriptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var inscriptionArray = [];
        const rows = yield database_1.default.query(`SELECT i.inscription_id, i.subject_id, i.inscription_date, i.approved_date, i.approved, i.final_note, i.class_hour, i.finished, s.name, s.quarter, s.professor
                FROM inscription i, subject s
                WHERE i.pupil_id = ? AND i.subject_id = s.subject_id;`, [req.params.id]).catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined && rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let auxApproved;
                let auxFinished;
                if (rows[i].approved === 1) {
                    auxApproved = true;
                }
                else {
                    auxApproved = false;
                }
                if (rows[i].finished === 1) {
                    auxFinished = true;
                }
                else {
                    auxFinished = false;
                }
                inscriptionArray[i] = {
                    "inscription_approved": auxApproved,
                    "inscription_approved_date": rows[i].approved_date,
                    "inscription_date": rows[i].inscription_date,
                    "inscription_id": rows[i].inscription_id,
                    "inscription_note": rows[i].final_note,
                    "inscription_finished": auxFinished,
                    "inscription_class_hour": rows[i].class_hour,
                    "subject_id": rows[i].subject_id,
                    "subject_name": rows[i].name,
                    "subject_quarter": rows[i].quarter,
                    "subject_professor": rows[i].professor
                };
            }
            res.status(200).json({
                data: inscriptionArray
            });
        }
        else {
            return res.status(404).json({
                error: 'no data'
            });
        }
    });
}
exports.userInscriptions = userInscriptions;
function addInscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let jsonInscription = {
            pupil_id: req.body.pupil_id,
            subject_id: req.body.subject_id,
            inscription_date: req.body.inscription_date,
            approved_date: req.body.approved_date,
            approved: req.body.approved,
            final_note: req.body.final_note,
            class_hour: req.body.class_hour,
            finished: req.body.finished
        };
        const rows = yield database_1.default.query(`INSERT INTO inscription SET ?`, [jsonInscription])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    jsonInscription
                },
                status: 'OK'
            });
        }
    });
}
exports.addInscription = addInscription;
;
function setName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE user
                SET name = ?
                WHERE id = ?`, [req.params.name, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setName = setName;
function setSurname(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE user
                SET surname = ?
                WHERE id = ?`, [req.params.surname, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setSurname = setSurname;
function setUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE user
                SET username = ?
                WHERE id = ?`, [req.params.username, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setUsername = setUsername;
function setPhoneNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE user
                SET phone_number = ?
                WHERE id = ?`, [req.params.phone, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
    });
}
exports.setPhoneNumber = setPhoneNumber;
;
function setEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE user
                SET email = ?
                WHERE id = ?`, [req.params.email, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setEmail = setEmail;
function setBirthdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE user
                SET birthdate = ?
                WHERE id = ?`, [req.params.birthdate, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
    });
}
exports.setBirthdate = setBirthdate;
function setPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_1.User();
        let newPassword = yield user.encryptPassword(req.body.password);
        const rows = yield database_1.default.query(`UPDATE user
                SET password = ?
                WHERE id = ?`, [newPassword, req.params.id])
            .catch(err => {
            return res.status(400).send(err);
        });
        console.log(rows);
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
    });
}
exports.setPassword = setPassword;
//# sourceMappingURL=user.controller.js.map