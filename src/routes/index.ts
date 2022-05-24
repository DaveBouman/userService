import { useErrorHandler as use } from '../middleware/apiErrorMiddleware';
import { Router, } from 'express';
import Google from './google';
import Facebook from './facebook';
import MagicLogin from './magicLogin';
import Stripe from './stripe';
import User from './user';

const routes = Router();

routes.use('/google', Google);
// routes.use('/facebook', use(Facebook));
// routes.use('/auth', MagicLogin);
// routes.use('/stripe', Stripe);
routes.use('/users', User);

export default routes;