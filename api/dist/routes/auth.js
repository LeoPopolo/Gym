"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/signup', auth_controller_1.signup);
// router.post('/signin', signin);
// router.get('/profile', tokenValidation, profile);
// router.get('/users', tokenValidation, users);
exports.default = router;
//# sourceMappingURL=auth.js.map