import express from 'express';
import routes from './routes';
import { Kafka, logLevel } from 'kafkajs';

require('dotenv').config()

const app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const port = 8000;
var logger = require('tracer').console();

logger.info("Initializing Kafka...")
const kafka = new Kafka({
  clientId: 'api',
  brokers: ['broker:29092'],
  logLevel: logLevel.NOTHING,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});

const passengerProducer = kafka.producer()
const driverProducer = kafka.producer()

/**
 * Disponibiliza producer para todas as rotas
 */
 app.use((req, res, next) => {
  req.passengerProducer = passengerProducer;
  req.driverProducer = driverProducer;

  return next();
})

/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);  
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))



async function run() {  

  logger.info("Connecting to Kafka...")
  await passengerProducer.connect()
  await driverProducer.connect()
  logger.info("Done!")

  app.listen(port);
  logger.info('Server is running on http://localhost:' + port)
}

run().catch(logger.error)