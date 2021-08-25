import { WebSocketServer } from 'ws';
import { Kafka, logLevel } from 'kafkajs'
var logger = require('tracer').console();

const kafka = new Kafka({
    clientId: 'ws_driver',
    brokers: ['localhost:9092'],
    logLevel: logLevel.NOTHING,
    retry: {
      initialRetryTime: 300,
      retries: 10
    },
  });

export const driverConsumer = kafka.consumer({ groupId: 'driver_group' })

const wss = new WebSocketServer({ port: 8001 });

wss.on('connection', async function connection(ws, req) {

    logger.info('Ws Driver started at 8001')

    await driverConsumer.subscribe({ topic: 'EVENTOS_MOTORISTA_CORRIDA', fromBeginning: false  })
    logger.info('Subscribed on: EVENTOS_MOTORISTA_CORRIDA topic')
    await driverConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logger.info(String(message.value));
            ws.send(String(message.value))
        },
    });

    ws.on('message', async function incoming(message) {        

    });
    
});