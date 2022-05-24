import { Router } from 'express';
import passport from 'passport';
import GoogleController from '../controllers/googleController';

const router = Router();
const googleController = new GoogleController();

router.get('/auth', googleController.authenticate);
router.get('/auth/callback', googleController.callback);
router.get('/auth/failed', googleController.authFailed);
router.get('/auth/success', googleController.authSucces)
router.get('/logout', googleController.logout)

export default router;
