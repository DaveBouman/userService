declare type Recurring = {
    interval: 'day' | 'week' | 'month' | 'year';
    intervalcount?: number;
    usageType?: 'metered'
    trial_period_days: number
}

declare type BillingScheme = 'per_unit' | 'tiered'

declare type TaxBehavior = 'inclusive' | 'exclusive'