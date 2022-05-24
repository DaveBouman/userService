export class StripeCustomer {

}

export class StripeProduct {
    name: string;
    description: string;
    active: boolean;
    caption: string;
    images: string[];
    shippable: boolean;
    statementDescriptor: string;
    taxCode: string;
    packageDimensions: {height: number, length: number,weight: number, width: number};
    type: 'good' | 'service';
    unitLabel: string;
    url: string;
}

export class StripePrice {
    productId: string;
    unitAmount: number;
    currency: string;
    recurring: Recurring;
    billingScheme: BillingScheme;
    taxBehavior: TaxBehavior;
    active: boolean;
    nickname: string;
}

export class StripeCheckout {
    customerId: string;
    quantity: number
    priceId: string;
    mode: 'subscription' | 'payment' | 'setup'
    trialPeriodDays: number;
    items: StripeProduct[];
    cancel_at_period_end: boolean;
    paymentBehavior: 'allow_incomplete' | 'default_incomplete' | 'error_if_incomplete' | 'pending_if_incomplete';
    default_payment_method: 'default_payment_method' | 'default_source';
}
