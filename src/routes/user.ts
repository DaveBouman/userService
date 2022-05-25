import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.get("/test", userController.test);
router.post("/", userController.create);
router.get('/auth', userController.auth);
router.post('/authsucces', userController.authSucces)
router.post('/signin',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });
router.post('/create', userController.create);

export default router;
