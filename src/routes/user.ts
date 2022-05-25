import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.get('/', userController.getList)
router.get("/test", userController.test);
router.post("/", userController.create);
router.get('/auth', userController.auth);
router.get('/makeadmin', userController.makeAdmin)
router.post('/authsucces', userController.authSucces)
router.get('/followers', userController.getFollowers)
router.post('/followers', userController.followUser)
router.post('/signin',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });
router.get('/signout', userController.signOut);
router.post('/create', userController.create);
router.delete('/', userController.delete);

export default router;