import { Router } from 'express';
import MagicLoginController from '../controllers/magicLoginController';

const router = Router();
const magicLinkController = new MagicLoginController();

router.post("/magiclogin", magicLinkController.login);
router.get('/magiclogin/callback', magicLinkController.callback);
router.get('/failed', magicLinkController.authFailed)
router.get('/success', magicLinkController.authSucces)

export default router;
