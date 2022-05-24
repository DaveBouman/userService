import Stripe from 'stripe';
import { StripePrice, StripeProduct, StripeCheckout } from '../entities/stripe';
import SendGridService from './sendGridService';
import SendGridMessage from '../entities/sendGrid';

class StripeService {

    private stripe: Stripe;
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2020-08-27',
            appInfo: { // For sample support and debugging, not required for production:
                name: "atomize",
                version: "0.0.1",
                url: process.env.DOMAIN
            }
        });
    }

    async createProduct(entity: StripeProduct): Promise<Stripe.Product> {
        const product = await this.stripe.products.create({
            name: entity.name,
            description: entity.description,
            active: entity.active,
            caption: entity.caption,
            images: entity.images,
            shippable: entity.shippable,
            statement_descriptor: entity.statementDescriptor,
            tax_code: entity.taxCode,
            package_dimensions: entity.packageDimensions,
            type: entity.type,
            unit_label: entity.unitLabel,
            url: entity.url
        });

        return product;
    }

    async retrieveProduct(id: string): Promise<Stripe.Product> {
        const product = await this.stripe.products.retrieve(
            id
        );

        return product;
    }

    async updateProduct(id: string, entity: StripeProduct): Promise<Stripe.Product> {
        const product = await this.stripe.products.update(
            id,
            {
                name: entity.name,
                description: entity.description,
                active: entity.active,
                caption: entity.caption,
                images: entity.images,
                shippable: entity.shippable,
                statement_descriptor: entity.statementDescriptor,
                tax_code: entity.taxCode,
                package_dimensions: entity.packageDimensions,
                unit_label: entity.unitLabel,
                url: entity.url,
            }
        );

        return product;
    }

    async deleteProduct(id: string): Promise<Stripe.DeletedProduct> {
        const deleted = await this.stripe.products.del(
            id
        );

        return deleted;
    }

    async getAllProducts(limit: number): Promise<Stripe.ApiList<Stripe.Product>> {
        const products = await this.stripe.products.list({
            limit: limit,
        });

        return products;
    }


    async createPrice(entity: StripePrice): Promise<Stripe.Price> {

        const price = await this.stripe.prices.create({
            active: entity.active,
            unit_amount: entity.unitAmount,
            currency: entity.currency,
            recurring: entity.recurring,
            product: entity.productId,
            billing_scheme: entity.billingScheme,
            tax_behavior: entity.taxBehavior
        });

        return price;
    }

    async retrievePrice(priceId: string) {
        const price = await this.stripe.prices.retrieve(
            priceId
        );

        return price;
    }

    async updatePrice(entity: StripePrice): Promise<Stripe.Price> {

        const price = await this.stripe.prices.update(
            entity.productId,
            {
                active: entity.active,
                recurring: entity.recurring,
                nickname: entity.nickname,
                tax_behavior: entity.taxBehavior,
            }
        );

        return price;
    }

    async getAllPrices(limit: number) {
        const prices = await this.stripe.prices.list({
            limit: limit,
        });

        return prices;
    }

    async createCustomer(email: string, name: string) {
        const customer = await this.stripe.customers.create({
            email,
            name: name,
        })

        return customer;
    }

    async getCustomerById(id: string): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
        const customer = await this.stripe.customers.retrieve(id)
        return customer
    }

    async getCustomerByEmail(email: string): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
        const customers = await this.stripe.customers.list({
            email: email
        });

        return customers.data[0]
    }

    async createCheckOutSession(entity: StripeCheckout) {
        const session = await this.stripe.checkout.sessions.create({
            mode: entity.mode,
            payment_method_types: ['card'],
            customer: entity.customerId,
            line_items: [
                {
                    price: entity.priceId,
                    quantity: 1,
                },
            ],
            // subscription_data: {
            //     trial_period_days: entity.trialPeriodDays
            // },
            success_url: `http://www.${process.env.DOMAIN}/succes`,
            cancel_url: `http://www.${process.env.DOMAIN}/failed`,
        })
        return session;
    }

    async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        const deleted = await this.stripe.subscriptions.del(
            subscriptionId
        );

        return deleted;
    }

    async fulfilment(payload: string | Buffer, signature: string | string[]) {
        const event = await this.stripe.webhooks.constructEventAsync(payload, signature, process.env.STRIPE_ENDPOINT_SECRET);


        if (event.type == 'checkout.session.completed') {
            // this.checkOutSessionComplete(event);
        }

        return event;
    }

    async checkOutSessionComplete(event: Stripe.Checkout.Session) {

        const session: any = await this.stripe.checkout.sessions.retrieve(event.data.object?.id, {
            expand: ['line_items']
        })

        const customerEmail: string = session.customer_details?.email;
        const description: string[] = [];

        if (session) {
            for (let index = 0; index < session.line_items?.data.length; index++) {
                const description = session.line_items?.data[index].price.description;
                // const product = session.line_items?.data[index].price.product;
                description.push(description);
            }
        }

        const details = {
            email: customerEmail,
            description: description,
        }

        this.sendProduct(details);
    }

    async sendProduct(details: { email: string, description: string[] },) {
        const sendGridService = new SendGridService();
        const sendGridEntity: SendGridMessage = {
            from: 'db.dave.bouman@gmail.com',
            to: 'db.dave.bouman@gmail.com',
            subject: 'test',
            text: details.description[0],
            html: details.description[0],
        }

        sendGridService.sendEmail(sendGridEntity);

    }
}

export default StripeService;