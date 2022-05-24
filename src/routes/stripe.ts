import { Router } from 'express';
import StripeController from '../controllers/stripeController';

const router = Router();
const stripeController = new StripeController();

router.get('/product/:id', stripeController.retrieveProduct);
router.post('/product', stripeController.createProduct);
router.delete('/product/:id', stripeController.deleteProduct);

router.get('/price/:id', stripeController.retrievePrice);
router.post('/price/:id', stripeController.createPrice);
router.put('/price/:id', stripeController.updatePrice);

router.post('/create-checkout-session', stripeController.createCheckOutSession);
router.post('/login', stripeController.createCustomer);

router.post('/webhook', stripeController.fulfilment);


export default router;
