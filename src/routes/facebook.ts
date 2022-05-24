import { Router } from 'express';
import FacebookController from '../controllers/facebookController';

const router = Router();
const facebookController = new FacebookController();

router.get('/auth', facebookController.authenticate);
router.get('/auth/callback', facebookController.callback);
router.get('/auth/failed', facebookController.authFailed);
router.get('/auth/success', facebookController.authSucces)
router.get('/logout', facebookController.logout)

export default router;
