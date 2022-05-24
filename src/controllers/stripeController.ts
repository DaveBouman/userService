import { Request, Response } from 'express';
import StripService from '../services/stripeService';
import { StripeCheckout, StripePrice, StripeProduct } from '../entities/stripe';

export default class StripeController {

    constructor(private stripeService = new StripService()) { }

    createProduct = async (req: Request, res: Response) => {
        const entity: StripeProduct = req.body;

        const product = await this.stripeService.createProduct(entity);

        return res.status(200).json({
            message: 'succesful',
            entity: product
        })
    }

    retrieveProduct = async (req: Request, res: Response) => {
        const id = req.params.id;

        const entity = await this.stripeService.retrieveProduct(id);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    updateProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        const entity: StripeProduct = req.body;

        const product = await this.stripeService.updateProduct(id, entity);

        return res.status(200).json({
            message: 'succesful',
            entity: product
        })
    }

    deleteProduct = async (req: Request, res: Response) => {
        const id = req.params.id;

        const entity = await this.stripeService.deleteProduct(id);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    getAllProducts = async (req: Request, res: Response) => {
        const limit = req.body.limit;

        const entities = await this.stripeService.getAllProducts(limit);

        return res.status(200).json({
            message: 'succesful',
            entity: entities
        })
    }

    createPrice = async (req: Request, res: Response) => {
        const entity: StripePrice = req.body;
        entity.productId = req.params.id;

        const price = await this.stripeService.createPrice(entity);

        return res.status(200).json({
            message: 'succesful',
            entity: price
        })
    }

    retrievePrice = async (req: Request, res: Response) => {
        const id = req.params.id;

        const entity = await this.stripeService.retrievePrice(id);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    updatePrice = async (req: Request, res: Response) => {
        const entity: StripePrice = req.body;
        entity.productId = req.params.id;

        const price = await this.stripeService.updatePrice(entity);

        return res.status(200).json({
            message: 'succesful',
            entity: price
        })
    }

    getAllPrices = async (req: Request, res: Response) => {
        const limit = req.body.limit;

        const entity = await this.stripeService.getAllPrices(limit);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    createCustomer = async (req: Request, res: Response) => {
        const email = req.body.email;
        const description = req.body.description;

        const entity = await this.stripeService.createCustomer(email, description);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    fulfilment = async (req: Request, res: Response) => {
        const payload = req.rawBody as string | Buffer;
        const signature = req.headers['stripe-signature'] || '';

        const entity = await this.stripeService.fulfilment(payload, signature);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    getCustomerById = async (req: Request, res: Response) => {
        const id = req.params.id;

        const entity = await this.stripeService.getCustomerById(id);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }

    createCheckOutSession = async (req: Request, res: Response) => {
        const entity: StripeCheckout = req.body;
        const email = req.body.email;

        entity.customerId = (await this.stripeService.getCustomerByEmail(email))?.id;

        if (!entity.customerId) {
            const name = req.body.name;
            entity.customerId = (await this.stripeService.createCustomer(email, name)).id;
        }

        const session = await this.stripeService.createCheckOutSession(entity);

        return res.status(200).json({
            message: 'succesful',
            entity: session.url
        })
    }

    cancelSubscription = async (req: Request, res: Response) => {
        const subscriptionId = req.body.subscriptionId;

        const entity = await this.stripeService.cancelSubscription(subscriptionId);

        return res.status(200).json({
            message: 'succesful',
            entity: entity
        })
    }
}
