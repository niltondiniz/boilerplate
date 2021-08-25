# Boilerplate

  ### Running API
  To start API: docker-compose up -d
  
  ### Running Websockets
  Driver WebSocket: yarn start_driver  
  Passenger WebSocket: yarn start_passenger
  
  - Driver WebSocket runnning on 8001 port
  - Passenger WebSocket runnning on 8002 port
   
  ### API Docs
  1. http://localhost:8000/doc

  ### API Status
  1. http://localhost:8000/health  

  ### Endpoints
  
  #### Request Trip Preview
    GET: http://localhost:8000/request-trip-preview
    
  #### Driver: Update Position
    POST: http://localhost:8000/command-driver-events?event=ATUALIZACAO_POSICAO
    
  #### Driver: Accept Trip
    POST: http://localhost:8000/command-driver-events?event=ACEITAR_CORRIDA
    
  #### Passenger: Request Trip
    POST: http://localhost:8000/command-passenger-events?event=SOLICITACAO_CORRIDA
    
  #### Driver: Done
    POST: http://localhost:8000/command-driver-events?event=CHEGADA_AO_DESTINO
    
  #### Driver: Cancel Trip
    POST: http://localhost:8000/command-driver-events?event=CANCELAR_CORRIDA
    
  
    
  
  
