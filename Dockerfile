FROM node:12.18.1

WORKDIR /usr/src/app
COPY api/package*.json .
RUN npm install -g nodemon
RUN npm install
COPY ./api .
CMD [ "npm", "run", "swagger-autogen" ]