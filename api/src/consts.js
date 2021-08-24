import { Kafka, logLevel } from 'kafkajs';
var logger = require('tracer').console();


logger.debug('Init Kafka resources');
/**
 * Faz conexão com o Kafka
 */
 const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    logLevel: logLevel.NOTHING,
    retry: {
      initialRetryTime: 300,
      retries: 10
    },
  });

//export const producer = kafka.producer()
export const passengerConsumer = kafka.consumer({ groupId: 'request-trip-group-consumer' })
export const driverConsumer = kafka.consumer({ groupId: 'request-trip-group-consumer' })