import express from 'express';
import { v4 as uuidv4 } from 'uuid';
var logger = require('tracer').console();

const routes = express.Router();

routes.post('/command-passenger-events', async (req, res) => {
   
  
  var event = req.query.event;
  var request = require('request');
  var data = {
    "ksql": "INSERT INTO EVENTOS_PASSAGEIRO VALUES (1234, 'SICLANO DE TAL', -22.850890, -43.173834, -22.948356, -43.164403, FROM_UNIXTIME(UNIX_TIMESTAMP()), '"+ event +"');"
  }  

  logger.info('Called: /command-passenger-events', data);

  request.post({
    headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },
    url: 'http://localhost:8088/ksql',
    body: JSON.stringify(data)
  }, function (error, response, body) {    
    return res.json({ ok: body })
  });

});

routes.post('/command-driver-events', async (req, res) => {

  var event = req.query.event;
  
  var request = require('request');
  var data = {
    "ksql": "INSERT INTO EVENTOS_MOTORISTA VALUES ('MOT', 1, 'TESTE', -22.850890, -43.173834, FROM_UNIXTIME(UNIX_TIMESTAMP()), '"+ event +"');"
  }

  logger.info('Called: /command-driver-events', data);

  request.post({
    headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },
    url: 'http://localhost:8088/ksql',
    body: JSON.stringify(data)
  }, function (error, response, body) {
    console.log(body)
    return res.json({ ok: body })
  });


});

routes.post('/request-trip-preview', async (req, res) => {

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

export default routes;