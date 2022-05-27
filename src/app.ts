import 'dotenv/config'
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index';
import morganMiddleware from './middleware/morganMiddelware';
import cookieSession from "cookie-session";
import './middleware/passportMiddleware';
import passport, { session } from 'passport';
import DataSource from './dataSource';
import Logger from './logger/logger';
import { CommunicationProtocolEnum, DaprClient, DaprServer } from 'dapr-client';
import cookieParser from 'cookie-parser';


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET, PUT, DELETE, POST",
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

DataSource
    .initialize()
    .then(() => {
        Logger.info("Data Source has been initialized!")
    })
    .catch((err: Error) => {
        Logger.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(cookieParser());
app.use(
    cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_SESSIONS_KEY],
    })
);
// app.use(morganMiddleware);
// app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(helmet());
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/users', routes);
app.use("/test", (req: Request, res: Response) => {
    return res.status(200).send("it works");
})
//start express server
app.listen(3001);

// async function start() {
//     const daprHost = 'localhost';
//     const daprPort = '53001';
//     const serverHost = 'localhost';
//     const serverPort = '3000';

//     const STATE_STORE_NAME = "postgres";



//     const server = new DaprServer(serverHost, serverPort, daprHost, daprPort, CommunicationProtocolEnum.HTTP);
//     const client = new DaprClient(daprHost, daprPort, CommunicationProtocolEnum.HTTP);
//     console.log("test2");

//     // Initialize the server to subscribe (listen)
//     await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: Record<string, any>) => {
//         // The library parses JSON when possible.
//         console.log(`[Dapr-JS][user service] Received: ${JSON.stringify(data)}`)
//     });

//     await server.start();
//     console.log("test3");

//     // Send a message
//     await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "message service" });
//     console.log("test4");
//     app.use('/dapr', async () => await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "This is by api" }));

//     // await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: any) => console.log(`Received: ${JSON.stringify(data)}`));

//     // await client.state.save(STATE_STORE_NAME, [
//     //     {
//     //         key: "order_3",
//     //         value: {
//     //             name: "test",
//     //             lastname: "sadsad"
//     //         },
//     //     },
//     //     {
//     //         key: "order_4",
//     //         value: 'this is from the user service via redis'
//     //     },
//     // ]);

//     // var result = await client.state.get(STATE_STORE_NAME, "order_1");
//     // console.log("Result after get: " + result);
// }

// start().catch((e) => {
//     console.error(e);
//     process.exit(1);
// });
