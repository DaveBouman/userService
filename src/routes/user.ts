import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.get("/test", userController.test);
router.post("/", userController.create);
router.get('/auth', userController.auth);
router.post('/create', userController.create);

export default router;
