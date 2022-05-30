declare global {
    namespace NodeJS {
        interface ProcessEnv {
            STRIPE_SECRET_KEY: string;
            STRIPE_ENDPOINT_SECRET: string

            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;

            TWITTER_CLIENT_ID: string;
            TWITTER_CLIENT_SECRET: string;

            MAGIC_LINK_SECRET: string;

            SENDGRID_API_KEY: string;

            COOKIE_SESSIONS_KEY: string

            DOMAIN: string;

            DATABASE_TYPE: string;
            DATABSE_HOST: string;
            DATABASE_PORT: number;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_DATABASE: string
        }
    }
}

export { }