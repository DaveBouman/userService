import { Kafka, Message, Producer } from "kafkajs"
import { kafka } from "../dataSource";

class KafkaService {
    producer: Producer;

    constructor() {
        this.producer = kafka.producer();
    }

    createConsumer = async (groupId: string) => {
        const consumer = kafka.consumer({ groupId: groupId })
        await consumer.connect();

        return consumer;
    }

}

export default KafkaService