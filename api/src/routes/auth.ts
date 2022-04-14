import { Router } from 'express';
import { tokenValidation } from '../libs/verifyToken';

const router: Router = Router();

import { signin, signup, profile, users }  from '../controllers/auth.controller';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', tokenValidation, profile);
router.get('/users', tokenValidation, users);

export default router;