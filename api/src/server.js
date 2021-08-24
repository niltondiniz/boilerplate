import express from 'express';
import routes from './routes';

const app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const port = 8000;
var logger = require('tracer').console();

/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

async function run() {  

  app.listen(port);
  logger.info('Server is running on http://localhost:8000')
}

run().catch(console.error)