import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CompressionTypes } from 'kafkajs'
var logger = require('tracer').console();

const routes = express.Router();

routes.post('/command-passenger-events', async (req, res) => {
  
  var event = req.query.event;

  var data = {
    "ID_PASS": 123,
    "NOME": "PASSAGEIRO 1",
    "LAT_ORIG": -22.850890,
    "LONG_ORIG": -43.173834,
    "LAT_DEST": -22.948356,
    "LONG_DEST": -43.164403,
    "DATETIME": 1629908826341,
    "TIPO": event
  }

  logger.info('Called: /command-passenger-events', data);

  var result = await req.passengerProducer
    .send({
      topic: 'EVENTOS_PASSAGEIRO',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(data) }
      ],
    })
    .then(logger.log)
    .catch(e => logger.error(`[Passenger producer] ${e.message}`, e))

    return res.json({ ok: result })
});

routes.post('/command-driver-events', async (req, res) => {

  var event = req.query.event;

  var data = {
    "CATEGORIA": "MOT",
    "ID_MOT": 1,
    "NOME": "MOTORISTA 1",
    "LAT": -22.850890,
    "LONG": -43.173834,    
    "DATETIME": 1629908826341,
    "TIPO": event
  }
  
  logger.info('Called: /command-driver-events', data);

  var result = await req.driverProducer
    .send({
      topic: 'EVENTOS_MOTORISTA',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(data) }
      ],
    })
    .then(logger.log)
    .catch(e => logger.error(`[Driver producer] ${e.message}`, e))

    return res.json({ ok: result }) 

});

routes.get('/request-trip-preview', async (req, res) => {

  var id = uuidv4();
  const message = {
    destination_description: 'Av Atlantica 100',
    fromLatLong: { lat: -23.333, long: 40.123 },
    toLatLong: { lat: -23.333, long: 40.123 }
  };

  const trip_preview = {
    price: 123.45,
    request_message: message,
  }

  logger.info('Called: /request-trip-preview', { ok: trip_preview, id: id });

  return res.json({ ok: trip_preview, id: id })

});

routes.get('/health', async (req, res) => {
  logger.info('Called: /health', { ok: 'Live!' });
  return res.json({ ok: 'Live!' })
});

routes.get('/filho', async (req, res) => {
  logger.info('Called: /health', { ok: 'Live!' });
  return res.json({ ok: 'ISAAC' })
});

export default routes;