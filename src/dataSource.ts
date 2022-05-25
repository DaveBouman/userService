import { CommunicationProtocolEnum, DaprClient, DaprServer } from "dapr-client";
import dapr from 'dapr-client';
import { Kafka } from "kafkajs"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "mssql",
    host: "semester6databases.database.windows.net",
    port: 1433,
    username: "davebouman",
    password: "W7BMZkn9H5cX9jQ",
    database: "userService",
    logging: false,
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    entities: ['src/entities/**/*.ts', 'entities/**/*.js'],
    migrations: ['api/migrations/**/*.ts', 'migrations/**/*.js'],
});


