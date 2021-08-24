import { WebSocketServer } from 'ws';
import { driverConsumer } from './consts';
var logger = require('tracer').console();

const wss = new WebSocketServer({ port: 8001 });

wss.on('connection', async function connection(ws, req) {

    logger.info('Ws Driver started at 8001')

    await driverConsumer.subscribe({ topic: 'EVENTOS_MOTORISTA_CORRIDA'  })
    logger.info('Subscribed on: EVENTOS_MOTORISTA_CORRIDA topic')
    await driverConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logger.info('Response', String(message.value));
            ws.send(JSON.stringify(message.value))
        },
    });

    ws.on('message', async function incoming(message) {        

    });
    
});