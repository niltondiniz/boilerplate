import { WebSocketServer } from 'ws';
import { Kafka, logLevel } from 'kafkajs';
var logger = require('tracer').console();

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    logLevel: logLevel.NOTHING,
    retry: {
      initialRetryTime: 300,
      retries: 10
    },
  });

export const passengerConsumer = kafka.consumer({ groupId: 'request-trip-group-consumer' })

const wss = new WebSocketServer({ port: 8002 });

wss.on('connection', async function connection(ws, req) {

    logger.info('Ws Passenger started at 8002')    

    await passengerConsumer.subscribe({ topic: 'CORRIDA'  })
    logger.info('Subscribed on: CORRIDA topic')
    await passengerConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logger.info('Response', String(message.value));
            ws.send(JSON.stringify(message.value))
        },
    });

    ws.on('message', async function incoming(message) {        

    });
    
});