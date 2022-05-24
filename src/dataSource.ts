import { CommunicationProtocolEnum, DaprClient, DaprServer } from "dapr-client";
import dapr from 'dapr-client';
import { Kafka } from "kafkajs"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "userService",
    logging: false,
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    entities: ['src/entities/**/*.ts', 'entities/**/*.js'],
    migrations: ['api/migrations/**/*.ts', 'migrations/**/*.js'],
});


